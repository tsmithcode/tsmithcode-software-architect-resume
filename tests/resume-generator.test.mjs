import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { outputFileNames, resume } from "../src/resume-data.mjs";
import { resumeHtml } from "../src/resume-template.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const canonicalPdfPath = path.join(root, "dist", outputFileNames[0]);

function countPdfPages(filePath) {
  const pdf = readFileSync(filePath, "latin1");
  return [...pdf.matchAll(/\/Type\s*\/Page\b/g)].length;
}

test("preserves the recovered two-page site PDF", () => {
  assert.equal(existsSync(canonicalPdfPath), true);
  assert.equal(countPdfPages(canonicalPdfPath), 2);
});

test("keeps the TSmithCode public-safe resume posture", () => {
  const serialized = JSON.stringify(resume);

  assert.match(serialized, /Senior Software Architect \| \.NET, TypeScript, Data Systems, SDLC/);
  assert.match(serialized, /thomas@tsmithcode\.ai/);
  assert.doesNotMatch(serialized, /tsmithcad@gmail\.com/i);
  assert.doesNotMatch(serialized, /linkedin\.com\/in\/tsmithcad/i);
  assert.doesNotMatch(serialized, /AUTODESK \+ ENTERPRISE INTEGRATIONS/i);
});

test("renders exactly two resume page containers", () => {
  const html = resumeHtml(resume, "data:image/png;base64,test");
  const pages = [...html.matchAll(/<main class="resume-page">/g)].length;

  assert.equal(pages, 2);
  assert.match(html, /Thomas D\. Smith software architect resume/);
  assert.match(html, /Architecture delivery pattern/);
});
