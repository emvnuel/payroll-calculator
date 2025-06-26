# Gemini Customization

This file guides Gemini's interactions with the `payroll-calculator` project.

## Technology Stack

- **Framework**: Next.js (v15) with React (v18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **UI Components**: Shadcn UI (indicated by `components.json` and `tailwind.config.ts`)
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod for validation
- **Charting**: Chart.js and Recharts
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Jest with ts-jest
- **Package Manager**: The presence of `bun.lockb` suggests Bun, but the scripts in `package.json` use `pnpm`. I will use `pnpm` for all commands.

## Development Commands

- **Run development server**: `pnpm dev`
- **Build project**: `pnpm build`
- **Run production server**: `pnpm start`
- **Run linter**: `pnpm lint`
- **Fix linting errors**: `pnpm lint:fix`
- **Format code**: `pnpm format:write`
- **Check formatting**: `pnpm format:check`
- **Run tests**: `pnpm test`
- **Check types**: `pnpm test:types` or `pnpm typecheck`
- **Combined checks**: `pnpm check` (runs linting and type checking)

## Coding Style and Conventions

- **Components**: Follow the structure of existing components in `src/components`. Use functional components with TypeScript.
- **Styling**: Use Tailwind CSS classes via `clsx` and `tailwind-merge` for conditional and combined styling.
- **State**: Use Zustand for global state management.
- **Commits**: Follow conventional commit standards (e.g., `feat:`, `fix:`, `chore:`).
- **Imports**: Use absolute paths from the `src` directory (e.g., `import { MyComponent } from '@/components/my-component'`).

## Project Goals

The primary goal is to build a payroll calculator application. The user will input salary information, and the application will calculate net pay, taxes, and other deductions. The application should also visualize the data with charts and maintain a history of calculations.
