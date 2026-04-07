# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run build` — build the project
- `npm run typecheck` — run type checks (run after completing code changes)

## Code Style

- Use ES module (`import`/`export`) syntax, not CommonJS (`require`)
- Use destructured imports where possible (e.g., `import { foo } from 'bar'`)

## Workflow

- Prefer running single tests over the full test suite for performance
- HTTP/HTTPS traffic is proxied through `127.0.0.1:7897` (configured in `.claude/setting.json`)
