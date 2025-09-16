# Todo List Application

A modern, responsive todo list application built with vanilla JavaScript, featuring project organization, priority levels, and persistent storage.

## Features

### ✨ Core Functionality
- **Task Management**: Create, edit, complete, and delete tasks
- **Project Organization**: Group tasks into custom projects
- **Priority Levels**: Assign High, Medium, Low, or No priority to tasks
- **Due Dates**: Set and track task deadlines
- **Local Storage**: Automatic saving and loading of all data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 User Experience
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Interactive Elements**: Hover effects, transitions, and micro-animations
- **Intuitive Navigation**: Sidebar project selection with active state indicators
- **Form Validation**: Required field validation and user-friendly error handling

## Project Structure

```
src/
├── index.js          # Main entry point and form event handlers
├── project.js        # Project class and project management logic
├── todo.js          # Todo class and task management logic
├── display.js       # DOM manipulation and UI rendering
├── storage.js       # LocalStorage operations
├── styles.css       # Complete styling and responsive design
└── template.html    # HTML structure and layout
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (recommended for development)

### Installation

1. Clone or download the project files
2. Ensure all files are in the correct directory structure
3. Open `template.html` in your web browser, or serve the files through a local web server

### Development Setup
If you're using a bundler or development server:
```bash
# Example with a simple HTTP server
npx http-server src/
```

## Usage

### Creating Projects
1. Click the **"New"** button in the top bar
2. Select **"Project"**
3. Enter a project name and submit
4. The new project will appear in the sidebar

### Adding Tasks
1. Click the **"New"** button in the top bar
2. Select **"Task"**
3. Fill out the task form:
   - **Title**: Required task name
   - **Description**: Optional task details
   - **Due Date**: Optional deadline
   - **Project**: Select existing project or create new one
   - **Priority**: Choose High, Medium, Low, or leave blank
4. Submit to add the task to the selected project

### Managing Tasks
- **Complete Tasks**: Check the checkbox next to any task
- **Delete Tasks**: Click the "Delete" button on any task
- **View Tasks**: Click on a project in the sidebar to view its tasks

### Managing Projects
- **View Project Tasks**: Click on any project in the sidebar
- **Delete Projects**: Click the "x" button next to any project (except "default")
- **Default Project**: A default project is always available and cannot be deleted

## Technical Details

### Architecture
The application follows a modular architecture with clear separation of concerns:

- **Model Layer**: `project.js` and `todo.js` contain the data models
- **View Layer**: `display.js` handles all DOM manipulation and rendering
- **Controller Layer**: `index.js` manages user interactions and form handling
- **Storage Layer**: `storage.js` handles data persistence

### Data Models

#### Todo Class
```javascript
{
  id: number,           // Unique identifier
  title: string,        // Task title
  description: string,  // Task description
  priority: string,     // 'high', 'medium', 'low', or null
  dueDate: string,      // ISO date string
  completed: boolean,   // Completion status
  createdAt: Date,      // Creation timestamp
  project: string       // Associated project name
}
```

#### Project Class
```javascript
{
  id: number,           // Unique identifier
  name: string,         // Project name
  todos: Array,         // Array of todo objects
  createdAt: Date       // Creation timestamp
}
```

### Local Storage
- All data is automatically saved to browser localStorage
- Data persists between browser sessions
- Corrupted data is automatically cleared and reset

### Browser Compatibility
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- LocalStorage API support required

## Customization

### Styling
The application uses a modern design system with:
- CSS Custom Properties for theming
- Responsive breakpoints at 1024px and 768px
- Smooth animations and transitions
- Gradient backgrounds and glassmorphism effects

### Extending Functionality
The modular architecture makes it easy to:
- Add new task properties
- Implement additional storage backends
- Create new project types
- Add filtering and sorting options

## File Dependencies

### Import/Export Structure
```
index.js → imports from todo.js, project.js, display.js
display.js → imports from project.js, todo.js
todo.js → imports from project.js
project.js → imports from storage.js
storage.js → pure utility functions
```

## Browser Support

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+
