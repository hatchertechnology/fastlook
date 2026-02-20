# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fastlook is a cross-platform Electron desktop app that wraps Fastmail (https://app.fastmail.com) in a native window with a built-in AI assistant side panel. Targets Linux, Windows, and macOS.

## Commands

```bash
npm install          # Install dependencies
npm start            # Run the app in development mode
npm run build        # Build distributables for all platforms
npm run build:linux  # Build Linux (AppImage + deb, x64/arm64)
npm run build:win    # Build Windows (NSIS, x64/arm64)
npm run build:mac    # Build macOS (dmg + zip, arm64/x64)
```

Build output goes to `dist/` (gitignored). There is no test framework configured yet.

## Architecture

This is a vanilla JavaScript Electron app with no bundler or transpiler. All source lives in `src/`.

- **`src/main.js`** — Electron main process. Creates the BrowserWindow with `webviewTag: true`, builds the native application menu, and exposes `get-fastmail-url` via IPC. The menu includes a "Toggle AI Panel" action (`Ctrl/Cmd+Shift+A`) that sends an IPC message to the renderer.
- **`src/preload.js`** — Preload script using `contextBridge` to expose a `window.fastlook` API to the renderer (IPC for Fastmail URL and AI panel toggle events). Context isolation is enabled; node integration is off.
- **`src/renderer.js`** — Renderer process (loaded by `index.html`). Manages the AI panel UI (open/close/toggle), chat message rendering, and contains the stub `getAiReply()` function that needs to be replaced with a real AI API integration.
- **`src/index.html`** — App shell with a flexbox layout: a `<webview>` for Fastmail on the left, a collapsible AI panel on the right. Has a Content Security Policy restricting script/style sources.
- **`src/styles.css`** — Catppuccin Mocha-themed dark UI styles for the app layout, AI panel, and chat messages.
- **`assets/entitlements.mac.plist`** — macOS entitlements for hardened runtime (JIT, unsigned memory, network client).

## Key IPC Flow

Main process → `toggle-ai-panel` IPC event → preload bridge (`window.fastlook.onToggleAiPanel`) → renderer toggles AI panel visibility.

## Build & Packaging

Uses `electron-builder` configured directly in `package.json` under the `"build"` key. App ID: `com.hatchertechnology.fastlook`.

## CI

GitHub Actions workflow (`.github/workflows/build.yml`) builds on push to main/master and on PRs. Builds all three platforms in a matrix. Tagged releases (`v*`) upload artifacts.
