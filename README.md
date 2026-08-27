# Constellations

> An interactive web app that visualizes your cultural consumption as a network of connected nodes, instead of a flat list.

## 📸 Demo

[TODO: add a screenshot or GIF of the project in action]

## 📋 Description

**What is it?**
An interactive web app where you log the works you consume — series, books, albums, movies — and instead of seeing them as a flat list, they're visualized as a network of connected nodes. Each work is a point on the map, and the lines connecting it to other works represent the reasons they resonate with each other: they can share a theme (moral dilemmas, killers, dystopias), an emotional tone (melancholy, fading love, nostalgia), or any other category you define.

**What does it look like in use?**
Imagine opening the app and seeing a canvas with scattered points. You add "Perfect Days" and "Even Though Our Love Fades Tonight" — both get linked by a line labeled "melancholy." You add "The Killer's Paradox" and "No One in the Woods" — they connect through "killer theme," but "The Killer's Paradox" also links to a different work through "moral dilemma," because a work can have several connections at once, not a single fixed category. Over time, the map stops being a list and starts showing you patterns: what you're actually drawn to, what themes you keep coming back to without noticing.

**What does it demonstrate technically?**

- Non-trivial data modeling (many-to-many relationships between entities, not a simple CRUD).
- Complex state management in plain React, without relying on a library to solve the logic for you.
- Translating a data structure into a visual representation (node positioning, edges, some basic layout math).
- A real UX decision: how do you visually show that two works are connected for two distinct reasons at once?

## 🚀 Stack

- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest + React Testing Library
- **Linting:** ESLint

## 📁 Project structure

```
constellations/
├── src/
│   ├── app/                # Routes and pages (Next.js App Router)
│   │   ├── [route]/
│   │   │   ├── _hooks/     # Hooks specific to that page
│   │   │   ├── _services/  # Services specific to that page
│   │   │   └── page.tsx
├── components/              # Reusable UI components (with their tests alongside)
├── hooks/                   # Hooks shared across the whole app (e.g. useAuth)
├── services/                # Shared business logic / API calls
├── styles/                  # Global design configuration (palette, typography)
└── tailwind.config.ts       # Color palette and typography definitions
```

## 🧩 Code conventions

This project follows **Clean Code** principles — descriptive names, small functions/components, single responsibility, and more.
Full details in [`AGENTS.md`](./AGENTS.md).

## 📝 Commit convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <message>
```

Types used: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`

## 🗺️ Roadmap

- [x] Initial repo setup (README, LICENSE, .gitignore, agent rules)
- [x] Define the project
- [x] Set up Next.js + TypeScript + Tailwind
- [ ] Base component structure
- [ ] First working feature
- [ ] Testing configured
- [ ] Deploy

## 💻 Running it locally

```bash
git clone git@github.com:LuciaR22/constellations.git
cd constellations
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.
