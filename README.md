# Sentence Construction Tool

A React-based web application for practicing sentence construction with timed questions and feedback. Built using TypeScript, Tailwind CSS, and Axios, with a JSON server as the backend.

## Live Demo

View the live project here (vercel):  
👉 [https://sentence-construction-tool-gray.vercel.app](https://sentence-construction-tool-gray.vercel.app)

## Features

- Start screen with game information  
- 30-second timer per question  
- Progress bar to show question progress  
- Select words in the correct order  
- Feedback screen with a score out of 100  
- Responsive design  
- TypeScript for type safety  
- Tailwind CSS for styling  

## File Structure

```
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
├── db.json
├── server.js
├── vercel.json
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── README.md
```

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/DevHemang/sentence-construction-tool.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Deployment

1. Build the project:
   ```
   npm run build
   ```

2. Deploy using [Vercel](https://vercel.com), [Netlify](https://www.netlify.com/), or any static hosting service.

If you’re using JSON Server with Vercel, ensure `vercel.json` and `server.js` are properly configured.

## Dependencies

- React  
- TypeScript  
- Tailwind CSS  
- Axios  
- Vite  