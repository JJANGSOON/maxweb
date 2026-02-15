function escapeMd(text = "") {
  return text.replace(/([*_`~])/g, "\\$1");
}

function formatRichTextToken(token) {
  const text = token?.plain_text ?? "";
  if (!text) return "";

  const href = token?.href;
  const ann = token?.annotations ?? {};
  let out = escapeMd(text);

  if (ann.code) out = `\`${out}\``;
  if (ann.bold) out = `**${out}**`;
  if (ann.italic) out = `*${out}*`;
  if (ann.strikethrough) out = `~~${out}~~`;

  if (href) out = `[${out}](${href})`;
  return out;
}

function richTextToMarkdown(richText = []) {
  return richText.map(formatRichTextToken).join("");
}

function getFileUrl(fileObj) {
  if (!fileObj) return null;
  if (fileObj.type === "external") return fileObj.external?.url ?? null;
  if (fileObj.type === "file") return fileObj.file?.url ?? null;
  return null;
}

async function fetchBlockChildren({ notionFetch, blockId }) {
  const results = [];
  let cursor = undefined;

  while (true) {
    const query = new URLSearchParams();
    query.set("page_size", "100");
    if (cursor) query.set("start_cursor", cursor);

    const res = await notionFetch(`/v1/blocks/${blockId}/children?${query.toString()}`, {
      method: "GET",
    });

    results.push(...(res.results ?? []));
    if (!res.has_more) break;
    cursor = res.next_cursor;
  }

  return results;
}

function indentLines(text, spaces = 2) {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line ? `${pad}${line}` : line))
    .join("\n");
}

export async function blocksToMarkdown({ notionFetch, pageId }) {
  async function convertBlocks(blocks, depth = 0) {
    const out = [];

    for (let i = 0; i < blocks.length; i += 1) {
      const block = blocks[i];
      const type = block.type;
      const value = block[type] ?? {};
      const rich = value.rich_text ?? [];
      const text = richTextToMarkdown(rich).trim();

      switch (type) {
        case "paragraph":
          out.push(text || "");
          break;
        case "heading_1":
          out.push(`# ${text}`);
          break;
        case "heading_2":
          out.push(`## ${text}`);
          break;
        case "heading_3":
          out.push(`### ${text}`);
          break;
        case "bulleted_list_item": {
          let line = `${" ".repeat(depth * 2)}- ${text}`;
          if (block.has_children) {
            const children = await fetchBlockChildren({ notionFetch, blockId: block.id });
            const nested = await convertBlocks(children, depth + 1);
            if (nested.length) line += `\n${nested.join("\n")}`;
          }
          out.push(line);
          break;
        }
        case "numbered_list_item": {
          let line = `${" ".repeat(depth * 2)}1. ${text}`;
          if (block.has_children) {
            const children = await fetchBlockChildren({ notionFetch, blockId: block.id });
            const nested = await convertBlocks(children, depth + 1);
            if (nested.length) line += `\n${nested.join("\n")}`;
          }
          out.push(line);
          break;
        }
        case "to_do": {
          const checked = value.checked ? "x" : " ";
          out.push(`${" ".repeat(depth * 2)}- [${checked}] ${text}`);
          break;
        }
        case "quote":
          out.push(`> ${text}`);
          break;
        case "code": {
          const language = value.language ?? "text";
          out.push(`\`\`\`${language}\n${text}\n\`\`\``);
          break;
        }
        case "callout":
          out.push(`> ${text}`);
          break;
        case "divider":
          out.push("---");
          break;
        case "image": {
          const url = getFileUrl(value);
          const caption = richTextToMarkdown(value.caption ?? []).trim();
          if (url) {
            out.push(`![${caption || "image"}](${url})`);
          }
          break;
        }
        case "bookmark": {
          const url = value.url;
          if (url) out.push(`[${url}](${url})`);
          break;
        }
        case "embed": {
          const url = value.url;
          if (url) out.push(`[embed](${url})`);
          break;
        }
        case "video": {
          const url = getFileUrl(value) ?? value.external?.url;
          if (url) out.push(`[video](${url})`);
          break;
        }
        case "file": {
          const url = getFileUrl(value);
          if (url) out.push(`[file](${url})`);
          break;
        }
        case "pdf": {
          const url = getFileUrl(value);
          if (url) out.push(`[pdf](${url})`);
          break;
        }
        default:
          break;
      }

      if (block.has_children && !["bulleted_list_item", "numbered_list_item"].includes(type)) {
        const children = await fetchBlockChildren({ notionFetch, blockId: block.id });
        const nested = await convertBlocks(children, depth + 1);
        if (nested.length) out.push(indentLines(nested.join("\n"), 0));
      }
    }

    return out.filter((line) => line !== undefined);
  }

  const rootBlocks = await fetchBlockChildren({ notionFetch, blockId: pageId });
  const md = await convertBlocks(rootBlocks, 0);

  return md
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
