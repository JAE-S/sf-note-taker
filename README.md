# Surfe Note Taking App with @mentions

A React-based note-taking application with user mention functionality.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Usage](#usage)
- [Code Quality](#code-quality)
- [Testing](#testing)
- [Future Development](#future-development)
- [Considerations](#considerations)

## Features

- **View Current Notes**: View all notes in your current session
- **Reset Session**: Reset session notes
- **Expand / Edit Notes**: Expand notes to edit content
- **Auto-saving Notes**: Notes are automatically saved when you stop typing
- **User Mentions**: Type `@` to mention users
- **Real-time Preview**: See how your note looks with formatted mentions

## Tech Stack

- **React**: UI Library
- **TypeScript**: Type Safety
- **Redux Toolkit**: State management
- **RTK Query**: API data fetching
- **Tailwind CSS**: Styling
- **Vite**: Build optimization
- **Vitest**: Unit testing
- **Testing Library**: Component testing utilities
- **ESLint & Prettier**: Code quality and formatting
- **simple-git-hooks**: Git hooks for pre-commit linting

## Project Architecture

This project follows modern React architecture that combines elements of several patterns to create a maintainable structure for a single-page application.

- **Feature-Based Organization**: Components are structured around their functional purpose, with clear separation between reusable UI elements and page-specific views.
- **Centralized State Management**: Redux Toolkit provides global state handling with RTK Query for efficient API interactions, creating a predictable data flow.
- **Component Composition**: The application uses a hierarchy of component types (layouts, views, components) that compose together to create complete interfaces.
- **View/Container Pattern**: Separation between container components and presentational components.
- **Test-Driven Development**: Components are developed with accompanying unit tests that verify functionality.

## Project Structure

```
sf-note-taker/
├── src/
│   ├── assets/           # Images, styling, fonts, etc.
│   │   └── images/       # SVG and image files
│   ├── components/       # Reusable UI components
│   │   ├── header/       # Header components
│   │   └── loader/       # Loading indicator components
│   ├── layouts/          # Layout components
│   ├── store/            # Redux store setup
│   │   ├── apis/         # API service definitions
│   │   ├── slices/       # Redux state slices
│   │   ├── hooks.ts      # Custom Redux hooks
│   │   └── index.ts      # Store configuration
│   ├── test/             # Test configuration and utilities
│   │   ├── mocks/        # Mock data and mock functions
│   │   ├── results/      # Test result reports
│   │   └── setup.ts      # Test setup configuration
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── views/            # Feature-specific components
│   │   └── notes/        # Notes feature components
│   │       ├── components/ # Note-specific components
│   │       │   ├── __tests__/ # Component tests
│   │       │   ├── note_card.tsx
│   │       │   └── note_editor.tsx
│   │       └── notes-dashboard_view.tsx
│   ├── App.tsx           # Main App component
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
├── vitest.config.js      # Vitest configuration
└── ...config files
```

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:JAE-S/sf-note-taker.git
   cd sf-note-taker
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Development

```bash
# Start development server
yarn dev

# Build
yarn build

# Lint code
yarn lint

# Run tests
yarn test

# Run tests with watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

## Usage

// TODO: note usage

## Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **simple-git-hooks** for pre-commit checks

## Testing

The application includes unit tests. Future Development should include end to end tests with tools like playwright.

- **Component Testing**: Each component has corresponding unit tests in a `__tests__` directory.
- **Mock Data**: Tests use centralized mock data and utility mocks for consistent testing.
- **Testing Tools**:
  - **Vitest**: Modern testing framework for Vite projects
  - **Testing Library**: DOM testing utilities to test components like users would interact with them
  - **Test IDs**: Components use data-testid attributes for reliable element selection in tests
  - **Coverage Reports**: Test coverage reports are generated in `src/test/results/coverage`
  - **Test Reports**: JSON and HTML test reports are available in `src/test/results`

To run tests:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate test coverage report
yarn test:coverage
```

## Future Development

// TODO: Note future development ideas

## Considerations

// TODO: Note application considerations