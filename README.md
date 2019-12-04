# Interview Scheduler
Single-page React application that allows users to book, edit and cancel interviews in a given one-hour slot for a selected weekday. <br>
This application utilizes several testing development platforms, namely Storybook, Webpack Dev Server, Jest and Cypress. Also combines a concise API and WebSocket server to build a realtime experience.

## Setup and Getting Started

1. Install dependencies with `npm install`.
2. [Download](https://github.com/mwong01/scheduler-api) the API server and follow on-screen instructions
3. Initiate Webpack Development Server with `npm start`.
4. Initiate Jest Test with `npm test`.
5. Initiate Storybook Visual Testbed with `npm run storybook`.
6. View Interview Scheduler on (http://localhost:8000/).

## Select Screenshots
!["Nothing on Monday!"](https://github.com/mwong01/scheduler/blob/master/docs/scheduler-empty-schedule.png)
!["Create an interview"](https://github.com/mwong01/scheduler/blob/master/docs/scheduler-create-interview.png)
!["Saving an interview"](https://github.com/mwong01/scheduler/blob/master/docs/scheduler-saving-interview.png)
!["Deleting an interview"](https://github.com/mwong01/scheduler/blob/master/docs/scheduler-delete-interview.png)
!["Interviewee name required!"](https://github.com/mwong01/scheduler/blob/master/docs/scheduler-name-required.png)
!["Jam-packed Monday schedule!"](https://github.com/mwong01/scheduler/blob/master/docs/scheduler-full-monday.png)

## DevDependencies
- "@babel/core": "^7.4.3"
- "@storybook/addon-actions": "^5.0.10"
- "@storybook/addon-backgrounds": "^5.0.10"
- "@storybook/addon-links": "^5.0.10"
- "@storybook/addons": "^5.0.10"
- "@storybook/react": "^5.0.10"
- "@testing-library/jest-dom": "^4.0.0"
- "@testing-library/react": "^8.0.7"
- "@testing-library/react-hooks": "^3.2.1"
- "babel-loader": "^8.0.5"
- "node-sass": "^4.11.0"
- "prop-types": "^15.7.2"
- "react-test-renderer": "^16.9.0"