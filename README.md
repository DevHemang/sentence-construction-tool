Sentence Construction Tool
A React-based web application for practicing sentence completion with timed questions and feedback.
Features

Start screen with game info
30-second timer per question
Progress bar
Word selection in correct order
Feedback screen with score (out of 100)
Responsive design
TypeScript for type safety
Tailwind CSS for styling

File Structure
sentence-construction-tool/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── StartScreen.tsx
│   │   ├── QuestionScreen.tsx
│   │   └── FeedbackScreen.tsx
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── README.md

Setup

Clone the repository
Install dependencies:

npm install


Run JSON Server with the provided JSON data:

npx json-server --watch db.json --port 3000


Start the development server:

npm run dev

Deployment

Build the project:

npm run build


Deploy to Vercel/Netlify using their CLI or GitHub integration

Dependencies

React 18
TypeScript
Tailwind CSS
Axios
Vite

Development

Uses Vite for fast development
TypeScript for type safety
Tailwind CSS for responsive styling
Component-based architecture
Proper state management for game flow

