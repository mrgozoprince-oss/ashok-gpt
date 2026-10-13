# ASHOK GPT — Starter Prototype

This is a front-end prototype for the black + premium yellow ASHOK GPT workspace.

## Current features
- Multi-AI Hub provider selector prototype (OpenAI, Gemini, Claude, OpenRouter, Ollama/local models)
- Responsive mobile-first interface
- Navigation for chat, coding, mod/plugin making, texture/assets, video, and memory
- Demo chat flow (not connected to an AI model)
- File picker demo (does not upload/read file contents)
- Browser-local memory notes using localStorage
- Basic PWA manifest and service worker

## Important limitations
This is not a trained AI model. The Multi-AI Hub is only a provider selector UI; it does not connect to OpenAI, Gemini, Claude, OpenRouter or Ollama yet. It does not yet generate images/video, inspect JAR files, compile mods, or call an AI API. Those features require separately implemented model/service integrations and a secure backend. Do not put API keys in `app.js` or other public frontend files.

## Open locally
Open `index.html` in a browser for a basic preview. For PWA install/service-worker behavior, serve the folder over HTTPS or localhost.

## Suggested next phases
1. Connect a backend chat endpoint; store secrets as server-side environment variables.
2. Add conversation persistence and user-controlled memory.
3. Add safe file parsing for supported text/source formats.
4. Add a sandboxed build runner for Gradle/Minecraft projects, with time/resource limits and no untrusted code access to secrets.
5. Integrate licensed image and video generation tools; check usage limits and watermark/export terms.
6. Add automated tests and build a native Android wrapper only if needed.


## Multi-AI Hub integration notes
- OpenAI, Gemini and Claude API access depends on provider terms, model availability and account billing/quotas.
- OpenRouter access and pricing varies by model/provider.
- Ollama requires a compatible local runtime on a PC/server; larger models generally are not practical to run solely on many Android phones.
- Build a backend adapter per provider and keep credentials in server-side environment variables. Do not store API keys in the frontend or commit them to Git.
- "All GPTs" cannot be bundled by copying proprietary/custom GPTs. Connect only models and services that offer authorized API/integration access.
