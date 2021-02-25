# Interview Scheduler

## At a glance

The Interview Scheduler is a React-based single-page-application for booking student interviews. Custom hooks are implemented so users can add, edit, or delete an interview, with data being synced across multiple clients in real-time via websockets. Data is persistent using PostgreSQL, and HTTP for communication. Test-Driven-Development was implemented via storybook, jest, and cypress ensuring confidence for individual components and end-to-end assurance, with a 93% code coverage.

## Features

- Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
- A user can switch between days and see detailed information
- The days show the number of slots available as a snapshot of the week
- A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
- Booked and available slots are clearly differentiated
- Days display currently remaining spots and capture updates after each modification
- A user can change the details of an existing interview by pressing the edit icon
- A user can cancel an existing interview, a pop-up message will ask to confirm the action before permanently - deleting an interview

## Stack

**Front-End:** React, JSX, HTML, SCSS, JS

**Back-End:** Express, Axios, Node.js, PostgreSQL

**Testing:** Jest, Storybook, Cypress, React Testing Library

## Screenshots

!["Main Page"]()*The main page upon loading the application*

!["Mobile First"]()*Mobile-first development*

!["Booking an Interview"]()*Booking an Interview*

!["Status"]()*A status message appears when saving or deleting*

!["Blank Name"]()*Error handling for blank name input*

!["Error Handling"]()*An example of the messaged received when failing to save*

!["Jest Coverage"]()*Tests cover 93% of all code*

!["Storybook"]()*Story book is used to test react components in isolation*

![Cypress Gif]()*Cypress was used to test end-to-end systems*



## Setup

- Install dependencies with `npm install`
- Fork and clone the [api-server](https://github.com/alexhauka/scheduler-api)
- Run the api-server and the client concurrently

## URL preview via Netlify

- [Netlify URL](https://6036b042f4b6e20a0f5f40e9--musing-ride-234ebb.netlify.app/)
- It may require going to [API URL](https://scheduler-alexhauka.herokuapp.com/api/days) in order to refresh the API database; in which case, wait a few minutes before trying the netlify link again

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress end-to-end test

```sh
npm run cypress
```

# Dependencies

- [axios](https://www.npmjs.com/package/axios)
- [classnames](https://www.npmjs.com/package/classnames)
- [normalize.css](https://www.npmjs.com/package/normalize.css)
- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-scripts](https://www.npmjs.com/package/react-scripts)


