# TSmithCode and CAD Guardian Resume Generator

Standalone source of truth for the 2-page Thomas D. Smith resume PDFs used by the TSmithCode and CAD Guardian opportunity surfaces.

## What is preserved

- `dist/thomas-smith-software-architect-resume-2026-06-08.pdf` is the recovered 2-page PDF from `cadguardian-opportunity-showcase` commit `af62fea`.
- `dist/thomas-smith-software-architect-resume-2026.pdf` is the stable public filename from the same site era.
- `dist/thomas-smith-cadguardian-cad-automation-consulting-resume-2026-06-08.pdf` is the CAD Guardian consulting-buyer flavor.
- `dist/thomas-smith-cadguardian-cad-automation-consulting-resume-2026.pdf` is the stable CAD Guardian filename.
- `scripts/generate-resume.mjs`, `src/resume-data.mjs`, and `src/resume-template.mjs` are the standalone generation system.
- `assets/tsmithcode-logo-highlighted.png` and `assets/cad-guardian-logo-highlighted.png` are embedded into their matching PDFs.

## Generate a fresh copy

```bash
pnpm install
pnpm generate
```

Fresh TSmithCode and CAD Guardian output is written to `out/` so the recovered PDFs in `dist/` stay stable.

## Verify

```bash
pnpm verify
```

The verification checks that preserved PDFs are present, stay at 2 pages, and keep the public-safe TSmithCode and CAD Guardian content postures.
