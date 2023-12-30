# CorpComment

CorpComment is a React application built with TypeScript and Vite. It's a feedback system where users can post comments and upvote them. The comments are associated with companies, represented by hashtags.

![corpcomment screen capture](public/capture.png)

## Features

- Post feedback associated with a company
- Upvote feedback
- View feedback by company
- View all feedback
  
## Project Structure

The project is structured as follows:

- `src/components`: This directory contains all the React components used in the application.
  - `App.tsx`: This is the main component of the application. It fetches the feedback items when the component is mounted.
  - `feedback`: This directory contains components related to displaying and interacting with feedback items.
  - `hashtag`: This directory contains components for displaying and selecting companies.
  - `layout`: This directory contains layout components like `Header` and `Footer`.
- `src/stores`: This directory contains the Zustand store for managing application state.
- `src/main.tsx`: This is the entry point of the application.

## Installation

To install the project, clone the repository and install the dependencies using npm:

```sh
git clone <repository-url>
cd corpcomment
npm install
```

### Running the Project

To run the project in development mode, use the following command:

```sh
npm run dev
```

To build the project for production, use the following command:

```sh
npm run build
```

### Linting

The project uses ESLint for linting. To run the linter, use the following command:

```sh
npm run lint
```

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License

This project is licensed under the MIT License.
