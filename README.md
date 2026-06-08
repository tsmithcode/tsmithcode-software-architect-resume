# TSmithCode Software Architect Resume

Standalone source of truth for the 2-page Thomas D. Smith software architect resume originally generated for the TSmithCode.ai W2 resume download path.

## What is preserved

- `dist/thomas-smith-software-architect-resume-2026-06-08.pdf` is the recovered 2-page PDF from `cadguardian-opportunity-showcase` commit `af62fea`.
- `dist/thomas-smith-software-architect-resume-2026.pdf` is the stable public filename from the same site era.
- `scripts/generate-resume.mjs`, `src/resume-data.mjs`, and `src/resume-template.mjs` are the standalone generation system.
- `assets/tsmithcode-logo-highlighted.png` is the TSmithCode brand asset embedded into the PDF.

## Generate a fresh copy

```bash
pnpm install
pnpm generate
```

Fresh output is written to `out/` so the recovered PDFs in `dist/` stay stable.

## Verify

```bash
pnpm verify
```

The verification checks that the preserved PDF is present, stays at 2 pages, and keeps the public-safe TSmithCode resume content.
