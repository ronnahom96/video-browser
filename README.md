# Video Browser

A React application that allows users to browse and filter videos by artist, title, year, and genre. Built with React, TypeScript, Material-UI, and Vite.

## Features

- Search videos by artist name or title
- Filter videos by release year
- Filter videos by multiple genres
- Responsive grid layout
- Loading states and error handling
- Real-time filtering without page reload

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- Vite
- Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── api/          # API calls and data fetching
├── components/   # React components
├── hooks/        # Custom React hooks
├── theme/        # MUI theme configuration
├── types/        # TypeScript type definitions
└── App.tsx       # Root component
```

## API

The application fetches video data from:
```
https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json
```

The API returns:
- List of videos with title, artist, release year, and genre ID
- List of genres with ID and name

## Features Implementation

### Search Filter
- Real-time filtering as you type
- Searches through both artist name and video title
- Case-insensitive search

### Year Filter
- Dropdown with all available years
- Single year selection
- Automatically populated from video data

### Genre Filter
- Multiple genre selection
- Prevents duplicate genre selection
- Shows genre names but filters by ID

### Video Grid
- Responsive layout (1-3 columns)
- Hover effects
- Loading states
- Error handling
- "No results" message when filters return no matches

## Error Handling

The application includes comprehensive error handling:
- API fetch errors
- Loading states
- Empty state handling
- Type safety checks for data