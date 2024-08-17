# GitHub Repositories Explorer


This project is a React Native application that allows users to search for GitHub users and explore their repositories. It provides a user-friendly interface to view user profiles and repository details.

<p align="center">
  <a href="https://expo.dev/preview/update?message=remove%20.env&updateRuntimeVersion=1.0.0&createdAt=2024-08-17T11%3A42%3A10.972Z&slug=exp&projectId=2c1620cb-9d97-4178-b6ae-b441be4ae7af&group=0ad2b078-ae79-4b48-8a06-84bbcc745895">
    <img src="./assets/images/eas-update.svg" alt="QR code" width="200" height="200">
  </a>
</p>
<p align="center">
  <a href="https://expo.dev/preview/update?message=remove%20.env&updateRuntimeVersion=1.0.0&createdAt=2024-08-17T11%3A42%3A10.972Z&slug=exp&projectId=2c1620cb-9d97-4178-b6ae-b441be4ae7af&group=0ad2b078-ae79-4b48-8a06-84bbcc745895"
  style="font-size: 1.5em; font-weight: bold;">
    Try it now with Expo Go
  </a>
</p>

## Features

- Search for GitHub users
- View user profiles with avatars
- Explore user repositories
- Load more repositories on demand
- Responsive design with Tailwind CSS

## Tech Stack

- React Native
- Expo
- TypeScript
- React Query for data fetching and caching
- Zustand for state management
- React Hook Form for form handling
- Zod for schema validation
- Tailwind CSS for styling
- Jest for testing

## Project Structure

The project follows a modular structure:

- `src/`
  - `api/`: API-related code and hooks
  - `components/`: Reusable React components
  - `stores/`: Zustand store
  - `ui/`: UI components and utilities
  - `app/`: Main application screen and layout

## Setup and Installation

1. Clone the repository
2. Install dependencies:

```
yarn install
```

## Running the App

To start the development server:

```
yarn start
```

## Testing

Run tests using Jest:

```
yarn test
```

Run E2E test using Maestro:

```
yarn e2e-test
```

## Key Components

### Home Screen (`index.tsx`)

The main screen where users can search for GitHub users and view results.

### Collapsible Component (`collapsible.tsx`)

Displays user information and allows expanding to show repositories.

=======

This project is a React Native application that allows users to search for GitHub users and explore their repositories. It provides a user-friendly interface to view user profiles and repository details.

## Features

- Search for GitHub users
- View user profiles with avatars
- Explore user repositories
- Load more repositories on demand
- Responsive design with Tailwind CSS

## Tech Stack

- React Native
- Expo
- TypeScript
- React Query for data fetching and caching
- Zustand for state management
- React Hook Form for form handling
- Zod for schema validation
- Tailwind CSS for styling
- Jest for testing

## Project Structure

The project follows a modular structure:

- `src/`
  - `api/`: API-related code and hooks
  - `components/`: Reusable React components
  - `stores/`: Zustand store
  - `ui/`: UI components and utilities
  - `app/`: Main application screen and layout

## Setup and Installation

1. Clone the repository
2. Install dependencies:

```
yarn install
```

## Running the App

To start the development server:

```
yarn start
```

## Testing

Run tests using Jest:

```
yarn test
```

Run E2E test using Maestro:

```
yarn e2e-test
```

## Key Components

### Home Screen (`index.tsx`)

The main screen where users can search for GitHub users and view results.

### Collapsible Component (`collapsible.tsx`)

Displays user information and allows expanding to show repositories.


### API Hooks

- `useUsers`: Fetches GitHub user data
- `useRepos`: Fetches repository data for a specific user

### UI Components

- `Button`: Customizable button component
- `Input`: Form input component with error handling
- `EmptyList`: Displays when no data is available

## State Management

- Uses Zustand for managing pagination state
- React Query for server state management and caching

## Styling

- Utilizes Tailwind CSS for responsive and customizable styling
- Custom color palette defined in `nativewind-colors.js`
