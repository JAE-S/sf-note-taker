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
- **View Current Notes**: Reset session notes
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
- **ESLint & Prettier**: Code quality and formatting
- **simple-git-hooks**: Git hooks for pre-commit linting

## Project Architecture

This project follows modern React architecture that combines elements of several patterns to create a maintainable structure for a single-page applications.

- **Feature-Based Organization**: Components are structured around their functional purpose, with clear separation between reusable UI elements and page-specific views.
- **Centralized State Management**: Redux Toolkit provides global state handling with RTK Query for efficient API interactions, creating a predictable data flow.
- **Component Composition**: The application uses a hierarchy of component types (layouts, views, components) that compose together to create complete interfaces.
- **View/Container Pattern**: Separation between container components and presentational components.

## Project Structure

```
sf-note-taker/
├── src/
│   ├── Layouts/          # Layout components
│   ├── assets/           # Images, styling, fonts, etc.
│   ├── components/       # Reusable UI components
│   ├── store/            # Redux store setup
│   ├── types/            # Global type definition
│   ├── views/            # Page components
│   ├── App.tsx           # Main App component
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
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
```

## Usage

// TODO: note usage

## Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **simple-git-hooks** for pre-commit checks

## Testing

// TODO: Note the testing strategies

## Future Development

// TODO: Note future development ideas

## Considerations

// TODO: Note application considerations
