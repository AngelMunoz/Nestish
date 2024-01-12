import { ServerRenderedTemplate, html } from "@lit-labs/ssr";

export type LayoutParams = {
  title?: string;
  head?: string | Promise<string>;
  scripts?: string | Promise<string>;
  isPartial?: boolean;
};
export function Layout(
  { title, head, scripts, isPartial }: LayoutParams = {},
  body?: ServerRenderedTemplate | null
) {
  if (isPartial) return body ?? html``;
  return html`
    <html>
      <head>
        <title>${title ?? "Nesto"}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css"
        />
        ${head}
      </head>
      <body hx-ext="morph">
        ${body}
        <script src="https://unpkg.com/htmx.org@1.9.10/dist/htmx.min.js"></script>
        <script src="https://unpkg.com/idiomorph@0.3.0/dist/idiomorph-ext.min.js"></script>
        <script>
          htmx.onLoad(function () {
            htmx.config.globalViewTransitions = true;
          });
        </script>
        ${scripts}
      </body>
    </html>
  `;
}
