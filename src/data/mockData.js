export const TEMPLATES = [
  { id: "saas", name: "SaaS Dashboard", desc: "Metrics, charts & billing", accent: "violet" },
  { id: "ecom", name: "E-commerce Store", desc: "Storefront & checkout", accent: "amber" },
  { id: "portfolio", name: "Portfolio", desc: "Personal showcase site", accent: "sky" },
  { id: "chat", name: "AI Chat App", desc: "Conversational interface", accent: "emerald" },
  { id: "landing", name: "Landing Page", desc: "Marketing hero & pricing", accent: "rose" },
  { id: "admin", name: "Admin Dashboard", desc: "Tables, forms & auth", accent: "violet" },
];

export const INITIAL_PROJECTS = [
  { id: "p1", name: "ai-landing-page", desc: "Marketing site for a launch", framework: "React", updated: "2h ago", accent: "violet" },
  { id: "p2", name: "ecommerce-dashboard", desc: "Orders & inventory admin", framework: "React", updated: "1d ago", accent: "amber" },
  { id: "p3", name: "saas-analytics", desc: "Usage metrics & reporting", framework: "React", updated: "3d ago", accent: "sky" },
  { id: "p4", name: "portfolio-website", desc: "Personal dev portfolio", framework: "Vue", updated: "5d ago", accent: "emerald" },
  { id: "p5", name: "discord-clone", desc: "Realtime chat UI practice", framework: "React", updated: "1w ago", accent: "rose" },
];

export const FILE_TREE = {
  name: "my-project", type: "folder", open: true, children: [
    { name: "src", type: "folder", open: true, children: [
      { name: "components", type: "folder", open: true, children: [
        { name: "Navbar.jsx", type: "file" },
        { name: "Sidebar.jsx", type: "file" },
        { name: "Dashboard.jsx", type: "file" },
      ]},
      { name: "App.jsx", type: "file" },
      { name: "main.jsx", type: "file" },
    ]},
    { name: "public", type: "folder", open: false, children: [
      { name: "favicon.svg", type: "file" },
    ]},
    { name: "package.json", type: "file" },
    { name: "README.md", type: "file" },
  ]
};

export const FILE_CONTENTS = {
  "src/App.jsx": `import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;`,
  "src/main.jsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  "src/components/Navbar.jsx": `export default function Navbar() {
  return (
    <header className="navbar">
      <span className="navbar-logo">Northwind</span>
      <nav className="navbar-links">
        <a href="#overview">Overview</a>
        <a href="#billing">Billing</a>
        <a href="#team">Team</a>
      </nav>
    </header>
  );
}`,
  "src/components/Sidebar.jsx": `const links = ["Overview", "Analytics", "Customers", "Settings"];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {links.map((link) => (
        <button key={link} className="sidebar-link">
          {link}
        </button>
      ))}
    </aside>
  );
}`,
  "src/components/Dashboard.jsx": `function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome back</h1>
      <p>Your AI workspace is ready.</p>
      <div className="dashboard-grid">
        <div className="card">Revenue</div>
        <div className="card">Active users</div>
        <div className="card">Conversion</div>
      </div>
    </div>
  );
}

export default Dashboard;`,
  "package.json": `{
  "name": "my-project",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^7.0.0"
  }
}`,
  "README.md": `# my-project

Generated with VibeForge. Run \`npm install && npm run dev\` to start.`,
  "public/favicon.svg": `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#7C5CFC"/></svg>`,
};

export const SUGGESTED_PROMPTS = [
  "Add authentication UI",
  "Make this responsive",
  "Improve the design",
  "Add dark mode",
  "Create a pricing page",
];

export const INITIAL_CHAT = [
  { id: "m1", role: "user", text: "Create a modern analytics dashboard with a dark theme." },
  {
    id: "m2", role: "ai",
    text: "I've created the dashboard structure. I added a responsive sidebar, analytics cards, charts, and a recent activity section.",
    file: "src/components/Dashboard.jsx",
  },
];

export const ACCENT_BG = {
  violet: "bg-violet-500", amber: "bg-amber-500", sky: "bg-sky-500",
  emerald: "bg-emerald-500", rose: "bg-rose-500",
};
export const ACCENT_TEXT = {
  violet: "text-violet-400", amber: "text-amber-400", sky: "text-sky-400",
  emerald: "text-emerald-400", rose: "text-rose-400",
};
export const ACCENT_RING = {
  violet: "ring-violet-500/30", amber: "ring-amber-500/30", sky: "ring-sky-500/30",
  emerald: "ring-emerald-500/30", rose: "ring-rose-500/30",
};
