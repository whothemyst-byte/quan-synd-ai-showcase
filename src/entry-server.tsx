import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

export function render(url: string) {
  const helmetContext: {
    helmet?: {
      title?: { toString?: () => string };
      priority?: { toString?: () => string };
      meta?: { toString?: () => string };
      link?: { toString?: () => string };
      script?: { toString?: () => string };
    };
  } = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title?.toString?.() ?? "",
        helmet.priority?.toString?.() ?? "",
        helmet.meta?.toString?.() ?? "",
        helmet.link?.toString?.() ?? "",
        helmet.script?.toString?.() ?? "",
      ].join("")
    : "";

  return { appHtml, head };
}
