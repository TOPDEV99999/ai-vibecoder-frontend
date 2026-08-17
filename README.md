# VibeForge

**Turn ideas into code.**

A frontend-only prototype of an AI-powered "vibe coding" platform — describe what
you want to build, and a mocked AI assistant walks you through generating and
editing code inside a full browser-based IDE.

## Stack


- Vite + React 18
- Tailwind CSS
- lucide-react icons
- No backend, no database, no auth — everything runs on local component state
  with mock/demo data.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to http://localhost:5173).

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## What's inside

- **Home dashboard** — hero prompt box, template gallery, recent projects
- **Workspace** — collapsible sidebar, top bar (branch/save/deploy/share),
  file explorer, tabbed code editor with line numbers and lightweight syntax
  highlighting, AI assistant chat with simulated responses and apply/undo,
  live preview with a responsive device switcher, and a collapsible terminal
- **Command palette** (`Ctrl/Cmd + K`)
- **New Project modal**
- **Settings** — general, appearance, editor, AI, keyboard shortcuts, account

## Project structure

```
src/
├── components/
│   ├── Sidebar/          # workspace project rail
│   ├── Topbar/          # project name, git branch, deploy, share
│   ├── FileExplorer/    # clickable file tree
│   ├── CodeEditor/      # tabs, line numbers, mock syntax highlighting
│   ├── AIAssistant/     # chat panel with apply/undo
│   ├── Preview/         # browser-chrome live preview
│   ├── Terminal/        # collapsible terminal output
│   ├── CommandPalette/  # Ctrl/Cmd+K palette
│   ├── NewProjectModal/
│   ├── Settings/
│   └── UI/              # Logo, Toast, Toggle/Row primitives
├── pages/
│   ├── Home.jsx
│   └── Workspace.jsx
├── data/mockData.js     # projects, templates, file tree, chat, file contents
├── utils/helpers.js     # tree flattening + tiny highlighter
├── App.jsx
└── main.jsx
```

## Notes

This is a UI prototype: file contents, AI replies, deploys, and previews are
all simulated locally (with small timeouts to feel realistic) — nothing is
sent to a real server.
