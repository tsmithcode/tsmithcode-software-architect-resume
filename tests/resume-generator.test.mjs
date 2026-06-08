import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  cadGuardianResume,
  outputFileNames,
  resume,
  resumeVariants,
  tsmithCodeResume,
} from "../src/resume-data.mjs";
import { resumeHtml } from "../src/resume-template.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function countPdfPages(filePath) {
  const pdf = readFileSync(filePath, "latin1");
  return [...pdf.matchAll(/\/Type\s*\/Page\b/g)].length;
}

function pdfPathsIn(directory) {
  return resumeVariants.flatMap((variant) =>
    variant.outputFileNames.map((fileName) => path.join(root, directory, fileName)),
  );
}

test("keeps the original TSmithCode exports and filenames stable", () => {
  assert.equal(resume, tsmithCodeResume);
  assert.deepEqual(outputFileNames, [
    "thomas-smith-software-architect-resume-2026-06-08.pdf",
    "thomas-smith-software-architect-resume-2026.pdf",
  ]);
});

test("preserves all recovered and canonical two-page PDFs", () => {
  for (const filePath of pdfPathsIn("dist")) {
    assert.equal(existsSync(filePath), true, `${filePath} exists`);
    assert.equal(countPdfPages(filePath), 2, `${filePath} is 2 pages`);
  }
});

test("validates regenerated PDFs when generation has run", () => {
  for (const filePath of pdfPathsIn("out")) {
    if (!existsSync(filePath)) {
      continue;
    }

    assert.equal(countPdfPages(filePath), 2, `${filePath} is 2 pages`);
  }
});

test("keeps the TSmithCode public-safe resume posture", () => {
  const serialized = JSON.stringify(tsmithCodeResume);

  assert.match(serialized, /Senior Software Architect \| \.NET, TypeScript, Data Systems, SDLC/);
  assert.match(serialized, /thomas@tsmithcode\.ai/);
  assert.doesNotMatch(serialized, /tsmithcad@gmail\.com/i);
  assert.doesNotMatch(serialized, /linkedin\.com\/in\/tsmithcad/i);
  assert.doesNotMatch(serialized, /AUTODESK \+ ENTERPRISE INTEGRATIONS/i);
});

test("keeps the CAD Guardian consulting-buyer posture", () => {
  const serialized = JSON.stringify(cadGuardianResume);

  assert.match(serialized, /CAD Guardian/);
  assert.match(serialized, /cadguardian\.com/);
  assert.match(serialized, /MicroStation/);
  assert.match(serialized, /AutoCAD/);
  assert.match(serialized, /Inventor/);
  assert.match(serialized, /SolidWorks/);
  assert.match(serialized, /protected artifacts/i);
  assert.doesNotMatch(serialized, /\bW2\b|recruiter|employment screening/i);
});

test("renders exactly two resume page containers for every variant", () => {
  for (const variant of resumeVariants) {
    const html = resumeHtml(variant, "data:image/png;base64,test");
    const pages = [...html.matchAll(/<main class="resume-page">/g)].length;

    assert.equal(pages, 2, `${variant.id} renders 2 pages`);
    assert.match(html, new RegExp(variant.documentTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("renders CAD Guardian-specific labels and proof sections", () => {
  const html = resumeHtml(cadGuardianResume, "data:image/png;base64,test");

  assert.match(html, /CAD Guardian strengths/);
  assert.match(html, /Buyer-safe proof/);
  assert.match(html, /CAD automation delivery pattern/);
});
