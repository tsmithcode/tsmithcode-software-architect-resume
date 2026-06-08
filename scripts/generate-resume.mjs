import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { outputFileNames, resume } from "../src/resume-data.mjs";
import { resumeHtml } from "../src/resume-template.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "out");
const logoPath = path.join(root, "assets", "tsmithcode-logo-highlighted.png");

async function imageDataUri(filePath) {
  const buffer = await readFile(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function renderResumePdf(page, outputPath) {
  const logoSrc = await imageDataUri(logoPath);
  await page.setContent(resumeHtml(resume, logoSrc), { waitUntil: "load" });
  await page.pdf({
    path: outputPath,
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
}

await mkdir(outputDir, { recursive: true });

const [datedFileName, stableFileName] = outputFileNames;
const datedOutputPath = path.join(outputDir, datedFileName);
const stableOutputPath = path.join(outputDir, stableFileName);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 1 });
  await renderResumePdf(page, datedOutputPath);
} finally {
  await browser.close();
}

await copyFile(datedOutputPath, stableOutputPath);

console.log(`Generated ${datedOutputPath}`);
console.log(`Generated ${stableOutputPath}`);
