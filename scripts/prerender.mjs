import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROUTES } from "./seo-routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const templatePath = path.join(distDir, "index.html");
const ssrEntryPath = path.join(ssrDir, "entry-server.js");

const template = await readFile(templatePath, "utf8");
const ssrModule = await import(pathToFileURL(ssrEntryPath).href);
const render = ssrModule.render;

if (typeof render !== "function") {
  throw new Error("SSR entry does not export a render(url) function");
}

for (const route of ROUTES) {
  const { appHtml, head } = await render(route);

  const html = template
    .replace("<!--app-head-->", head || "")
    .replace("<!--app-html-->", appHtml || "");

  const outFile =
    route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.replace(/^\//, ""), "index.html");

  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, html, "utf8");
}

await rm(ssrDir, { recursive: true, force: true });
console.log("Prerender complete");

