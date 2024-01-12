import { StreamableFile } from "@nestjs/common";
import { ServerRenderedTemplate, render } from "@lit-labs/ssr";
import { RenderResultReadable } from "@lit-labs/ssr/lib/render-result-readable.js";

export function toReadable(tpl: ServerRenderedTemplate) {
  const readable = new RenderResultReadable(render(tpl));
  return new StreamableFile(readable, { type: "text/html" });
}
