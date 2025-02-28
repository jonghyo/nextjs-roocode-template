# Next.js Template for RooCode AI Development [![build status](https://github.com/jonghyo/nextjs-roocode-template/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jonghyo/nextjs-roocode-template/actions/workflows/ci.yml)

This is a specialized Next.js template designed for AI-powered code generation using RooCode. It includes comprehensive configuration files and development rules to maximize the effectiveness of AI-assisted development.

## 🤖 RooCode Integration

This template comes pre-configured with essential files for RooCode AI development:

- `.clinerules` - Defines technical stack, development workflows, and coding standards for AI
- `.roomodes` - Configures custom AI modes for different development tasks
- Pre-configured development workflows optimized for AI collaboration
- Automated code quality checks and formatting rules that align with AI-generated code

## Features

- 🎯 Optimized for AI-assisted development with RooCode
- 🚀 [Next.js](https://nextjs.org/) with App Router for robust routing and server-side rendering
- 💎 [TypeScript](https://www.typescriptlang.org/) for type safety
- 🎨 [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/) for beautiful, customizable UI components
- 📦 [Zustand](https://github.com/pmndrs/zustand) for state management
- 🧪 [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing
- 📚 [Storybook](https://storybook.js.org/) for component documentation
- ✨ [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code quality
- 🔍 Pre-commit hooks with [lefthook](https://github.com/evilmartians/lefthook)
- 🛠️ Additional tools and libraries:
  - [Zod](https://zod.dev/) for schema validation
  - [React Hook Form](https://react-hook-form.com/) for form management
  - Day.js for date handling
  - NextAuth.js for authentication
  - [Pino](https://github.com/pinojs/pino) for logging
  - MSW for API mocking
  - Playwright for E2E testing

## AI Development Configuration

### .clinerules

The `.clinerules` file defines:

- Technical stack specifications
- Development workflow phases
- Coding standards and best practices
- Testing requirements
- Security guidelines

### .roomodes

Custom AI modes for different development tasks:

- PM Mode: Project management and requirements definition
- Architect Mode: System design and architecture planning
- Code Mode: Implementation and testing
- Debug Mode: Problem diagnosis and resolution

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm
- RooCode extension installed in VS Code

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nextjs-roocode-template
```

2. Install dependencies:

```bash
npm ci
```

3. Copy the environment file:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests with Vitest
- `npm run test:coverage` - Generate test coverage report
- `npm run storybook` - Start Storybook development server
- `npm run tsc` - Check TypeScript types

## Project Structure

```bash
src/
├── __mocks__/       # Mock definitions
├── __tests__/       # Test files
├── app/             # Next.js App Router files
├── components/      # React components
│   ├── features/    # Feature-specific components
│   ├── layout/      # Layout components
│   └── ui/          # Base UI components
├── env/             # Environment variables definition for t3-env
└── lib/             # Utility functions and shared logic
```

## Development Guidelines

- Follow the development workflow defined in `.clinerules`
- Utilize appropriate AI modes for different development tasks
- Follow the TypeScript coding standards
- Write comprehensive tests for new features
- Update Storybook documentation for UI components
- Ensure ESLint and Prettier rules are followed
- Use shadcn/ui components when possible
- Follow the commit message convention

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the AI development guidelines
3. Run tests and ensure all checks pass
4. Submit a pull request to `main`

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.
