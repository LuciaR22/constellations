# [Project Name] — TODO: define

> [TODO: one-line description of what the project does and what problem it solves]

## 📸 Demo

[TODO: add a screenshot or GIF of the project in action]

## 📋 Description

[TODO: longer description — what it is, who it's for, why you built it]

## 🚀 Stack

- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest + React Testing Library
- **Linting:** ESLint

## 📁 Project structure

```
my-project/
├── app/                    # Routes and pages (Next.js App Router)
│   ├── [route]/
│   │   ├── _hooks/         # Hooks specific to that page
│   │   ├── _services/      # Services specific to that page
│   │   └── page.tsx
├── components/             # Reusable UI components (with their tests alongside)
├── hooks/                  # Hooks shared across the whole app (e.g. useAuth)
├── services/                # Shared business logic / API calls
├── styles/                 # Global design configuration (palette, typography)
└── tailwind.config.ts      # Color palette and typography definitions
```

## 🧩 Code conventions

This project follows **Clean Code** principles:
- Descriptive names
- Small functions/components
- Full details in [`.cursorrules`](./.cursorrules)

## 📝 Commit convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <message>
```

Types used: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`

## 🗺️ Roadmap

- [x] Initial repo setup (README, LICENSE, .gitignore, cursor rules)
- [ ] Define the project
- [ ] Set up Next.js + TypeScript + Tailwind
- [ ] Base component structure
- [ ] First working feature
- [ ] Testing configured
- [ ] Deploy

## 💻 Running it locally

[TODO: complete once the project is initialized]

```bash
git clone git@github.com:LuciaR22/Front_AI_Intership.git
cd Front_AI_Intership
npm install
npm run dev
```

## 📄 License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.