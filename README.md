# Fastlook

A cross-platform desktop app for [Fastmail](https://www.fastmail.com) with an integrated AI assistant.  
Targets **Linux**, **Windows**, and **macOS (Apple Silicon / ARM)**.

---

## Features

- Full Fastmail experience in a native desktop window (via Electron `<webview>`)
- Built-in AI assistant panel (toggle with **Ctrl/Cmd + Shift + A**)
- Native app menus on all three platforms
- Hardened macOS runtime for signing & notarisation readiness

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 20
- npm ≥ 10

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm start
```

### Build distributables

| Platform | Command |
|---|---|
| Linux | `npm run build:linux` |
| Windows | `npm run build:win` |
| macOS | `npm run build:mac` |
| All | `npm run build` |

Built files are placed in the `dist/` directory.

---

## AI Integration

The AI assistant panel ships with a stub response handler in `src/renderer.js` (`getAiReply`).  
Replace that function with a call to your preferred API (OpenAI, Anthropic, Ollama, etc.) to enable live AI assistance.

---

## CI / CD

Every push to `main` / `master` and every pull request triggers GitHub Actions to build installers for all three platforms.  
On tagged releases (`v*`) the artifacts are uploaded and attached to the release.
