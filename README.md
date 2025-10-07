# School Management System

A modern, responsive school management system built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Overview of school statistics and key metrics
- **Student Management**: Add, edit, and manage student records
- **Teacher Management**: Handle teacher information and assignments
- **Course Management**: Organize courses and curriculum
- **Reports**: Generate various school reports
- **Attendance**: Track student and teacher attendance
- **Exams**: Manage exam schedules and results
- **AI Assistant**: Intelligent assistant for school management queries
- **Settings**: Configure system preferences

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd school-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   └── ui/           # Reusable UI components
├── lib/
│   └── utils.ts      # Utility functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
