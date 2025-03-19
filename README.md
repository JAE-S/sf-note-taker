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
- [Considerations](#considerations)
- [Challenges Encountered](#challenges-encountered)
- [Future Development](#future-development)


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

### Dashboard Overview
When you first open the application, you'll see the Notes Dashboard:

<div align="center">
  <img src="public/readme-assets/empty-state_screenshot.png" alt="Empty State Dashboard" width="600">
</div>

- A clean, grid-based layout of your existing notes
- A prominent "Create a Note" button at the top of the page
- If no notes exist, an encouraging empty state is displayed

### Creating a Note
1. Click the "Create a Note" button
2. A modal will open with the note editor

<div align="center">
  <grid>
    <img src="public/readme-assets/ceate-new-note-empty_screenshot.png" alt="Create New Note Empty" width="300">
    <img src="public/readme-assets/create-new-note-filled_screenshot.png" alt="Create New Note Filled" width="300">
    <img src="public/readme-assets/create-new-note-filled-2_screenshot.png" alt="Create New Note Filled 2" width="300">
    <img src="public/readme-assets/create-new-note-filled-complete_screenshot.png" alt="Create New Note Complete" width="300">
  </grid>
</div>

3. Enter a title (required)
4. Write your note content
5. Use `@` to mention users
   - Start typing `@` followed by a username, first name, or last name
   - A list of suggestions will appear
   - Click a suggestion to add the mention
6. See a live preview of your note with formatted mentions
7. The note will auto-save while you type (in edit mode)
8. Click "Create Note" to save and close the modal

### Viewing All Notes

<div align="center">
  <img src="public/readme-assets/view-all-notes_screenshot.png" alt="View All Notes" width="600">
</div>

- See all your created notes in a clean, organized grid
- Hover over a note card to reveal edit and interaction options
- The center note card shows an active hover state with edit and additional interaction controls
- Easy access to edit or interact with existing notes

### Editing a Note
1. Click the pencil icon on any note card
2. The note editor modal opens with the existing note content

<div align="center">
  <img src="public/readme-assets/edit-note_screenshot.png" alt="Edit Note" width="600">
</div>

3. Make your changes
4. The note will auto-save while you type
5. Click "Close" to exit the editor

### Error Handling
- Auto-save failures show error messages
- Notes require both title and content
- Informative loading and error states

### Mentions
- Type `@` in the note body to trigger user suggestions
- Suggestions include:
  - Usernames
  - First names
  - Last names
- Click a suggestion to insert the mention
- See a live preview of how mentions will appear styled

### Session Management
- Use the "Reset Session" button in the header
- This clears all current notes and creates a new session
- Useful for starting fresh or privacy purposes

## Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **simple-git-hooks** for pre-commit checks

## Testing

### Approach
- Implemented unit tests for components
- Focused on user interaction and state management
- Utilized Vitest and Testing Library
- Covered multiple scenarios including some edge cases
---

- **Component Testing**: Each component has corresponding unit tests in a `__tests__` directory.
- **Mock Data**: Tests use centralized mock data and utility mocks for consistent testing.
- **Vitest**: Modern testing framework for Vite projects
- **Testing Library**: DOM testing utilities to test components like users would interact with them
- **Test IDs**: Components use data-testid attributes for reliable element selection in tests
- **Coverage Reports**: Test coverage reports are generated in `src/test/results/coverage`
- **Test Reports**: JSON and HTML test reports are available in `src/test/results`

### Key Testing Areas
- Component rendering
- User input validation
- Mention suggestion functionality
- Save state management
- Error handling

### Run Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate test coverage report
yarn test:coverage
```
### Future Testing Improvements
- Implement end-to-end (E2E) tests
- Increase test coverage for complex interactions
- Add integration tests for Redux store and API interactions
- Accessibility testing

## Considerations

### State Management
- Utilized Redux Toolkit Query (RTK Query) for consistent data updates
- While this is a simple application RTK Query was chosen for its built-in synchronization capabilities, specifically for the handling of mentions and data fetching/refetching
- Simplifies complex data refresh and invalidation scenarios

## Challenges Encountered

### Data Transformation
- Initial data structure that was planned for differed from expected API format
- Developed comprehensive note transformers to handle:
  - Parsing incoming API responses
  - Converting internal note format to API-compatible format
- Created flexible transformation functions to manage different data shapes

### Mention Handling
- Implemented dynamic mention suggestion system
- Developed cursor-aware mention insertion
- Created preview functionality for mentioned users

### Mention Interaction Bug

#### Current Limitation
A critical bug has been identified in the mention suggestion system:

1. When a user types a full mention (e.g., "@Emma Johnson")
2. And then begins to edit by backspacing part of the name (deleting "n" from "Johnson")
3. The mention suggestion functionality fails to:
   - Repopulate suggestions
   - Maintain context of the partial mention
   - Provide a smooth editing experience

#### Root Cause
The current implementation only processes mentions when they are fully formed. It lacks robust handling for:
- Partial mention interactions
- Dynamic suggestion updates during text editing
- Maintaining mention context through incremental edits

#### Potential Solutions
- Implement a more flexible regex for partial mention detection
- Create a more dynamic suggestion lookup mechanism
- Add fallback suggestion handling for partial mentions
- Improve cursor positioning and mention tracking logic

This bug highlights the complexity of creating an intuitive mention system that feels natural during user interactions.

### Performance Considerations
- Implemented debounce for auto-save functionality
- A library like Lodash might be better suited for advanced debounce functionality in the future
- Managed potential performance impacts of frequent state updates

## Future Development
- Improve error handling
- Expand test coverage & testing methods
- Fix the Mention Interaction Bug as noted above
- Enable delete note
- Enable view note to show the styled note (note in edit mode - with an option to switch to edit mode)
- Improved accessibility considerations
