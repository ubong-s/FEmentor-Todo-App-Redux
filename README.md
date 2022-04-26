# Frontend Mentor Challenge - Todo app

Live Link [FE Mentor Todo App](https://devubong-todo-redux.netlify.app/)

![Design preview for the Todo app coding challenge](./src/design/desktop-preview.jpg)

## About this project
-  The challenge is to build out this todo app and get it looking as close to the design as possible.
-  This is a [Frontend Mentor](https://www.frontendmentor.io) challenge
-  Redux is used for state management
-  [@emotion/styled](https://emotion.sh/) is used for styling.
-  A developer's rite of passage. Good practice for a CRUD app


## The challenge

Users should be able to:

-  View the optimal layout for the app depending on their device's screen size
-  See hover states for all interactive elements on the page
-  Add new todos to the list
-  Mark todos as complete
-  Delete todos from the list
-  Filter by all/active/complete todos
-  Clear all completed todos
-  Toggle light and dark mode
-  **Bonus**: Drag and drop to reorder items on the list

## Building the project

-  State management with Redux [Example Code 1](https://github.com/ubong-s/FEmentor-Todo-App-Redux/blob/main/src/App.js) [Example Code 2](https://github.com/ubong-s/FEmentor-Todo-App-Redux/blob/main/src/reducer.js)
-  Responsive CSS using `@emotion/styled` [Example Code](https://github.com/ubong-s/FEmentor-Todo-App-Redux/blob/main/src/styles/globalStyles.js)
-  Reducer component to handle actions disptached [Code](https://github.com/ubong-s/FEmentor-Todo-App-Redux/blob/main/src/reducer.js)
-  Local Storage is implemented to save state history
-  Items can be reordered on the list

## Why I built the project this way

-  I used Redux for state management to improve my redux skills.
-  @emotion/styled is very similar to styled-components and a great library for styling. No class name bugs, easier deletion of CSS, simple dynamic styling and painless maintenance.
-  
## Improvements that can be made

-  Improve git commits and PR
-  Use a project management tool to manage processes
-  Incorporate a testing library
-  Refactor the code to make it cleaner especially the reordering lis section [Code](https://github.com/ubong-s/FEmentor-Todo-App-Redux/blob/main/src/components/BottomSection.js)
-  Add Comments
