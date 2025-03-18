import React from 'react';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Note Taking App</h1>
        <p className="app-subtitle">A simple note-taking app with @mentions</p>
      </header>

      <main className="app-content"> Main Application</main>
    </div>
  );
};

export default App;
