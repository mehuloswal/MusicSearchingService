# Music Searching Service

A React application built with TypeScript that allows users to search for music tracks using the Spotify Web API, listen to short previews, and manage favorite tracks.

## Features

-   **Search**: Search for tracks by name or artist.
-   **Track List**: View search results in a scrollable, responsive list with essential track information.
-   **Track Details**: Click on a track to view detailed information and listen to a preview if available.
-   **Favorites**: Favorite tracks are stored locally for quick access in a dedicated Favorites page.

## Technologies Used

-   **React** with **TypeScript**: For building the user interface with type safety.
-   **Vite**: As the build tool for fast development and bundling.
-   **Tailwind CSS**: For utility-first styling and responsive design.
-   **React Router DOM**: For client-side routing and navigation.
-   **Spotify Web API**: To fetch music data, including tracks and audio previews.

## Installation and Running the Project

### Prerequisites

-   **Node.js**
-   **npm** or **yarn**

### Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/mehuloswal/MusicSearchingService.git
    cd MusicSearchingService
    ```

2. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Setup Spotify API Credentials**

    - Create a .env file in the root directory with the following contents:

        ```env
        VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
        VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
        ```

    - Replace `your_spotify_client_id` and `your_spotify_client_secret` with your actual Spotify API credentials.

4. **Run the Development Server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    - Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Types of Tests

-   **Unit Tests**: Focus on individual components and functions.
    -   _Example_: Testing the `SearchBar` component to ensure it renders correctly and handles input changes as expected.
-   **Integration Tests**: Ensure that different parts of the application work together .
    -   _Example_: Testing the `FavoritesContext` to verify that favorite tracks can be added and removed correctly, and that these actions persist across component renders.

```bash
    npm run test
    # or
    yarn test
```

## Design Decisions and Major Libraries

-   **React with TypeScript**: Chosen for building scalable and maintainable user interfaces with type safety.
-   **Vite**: Provides a fast development environment with quick hot module replacement, optimized for modern JavaScript frameworks like React.
-   **Tailwind CSS**: Utilized for its utility-first approach, enabling rapid and responsive UI development without writing extensive custom CSS.
-   **React Router DOM**: Implemented for client-side routing to navigate between the Home, Track Details, and Favorites pages seamlessly.
-   **Context API**: Used to manage the global state for favorite tracks, allowing easy access across different components without prop drilling.
-   **Spotify Web API**: Offers a robust set of endpoints to search for tracks and retrieve track details, including audio previews.

## Known Limitations and Areas for Improvement

-   **Favorites Persistence**: Currently, favorites rely on localstorage for persistence.
-   **Spotify Preview URLs**: Many tracks' preview URLs are `null`, limiting the functionality to listen to track previews. Consider integrating another API that provides audio previews or informing users when previews are unavailable.
-   **Error Handling**: While basic error handling is implemented, there is room for improvement, such as providing user-friendly error messages and retry mechanisms.
-   **Accessibility**: Further enhancements can be made to improve accessibility, such as better focus management, ARIA attributes, and keyboard navigability.
-   **Testing**: Implement comprehensive unit and integration tests to ensure the reliability and robustness of components and features.
-   **Responsive Design**: Ensure that all components are fully responsive across all device sizes, including tablets and desktops with larger screens.
-   **Access Token**: Currently access token is not saved in the local storage for the APIs. If the application is reloaded, a new access token is created, else the same access token will be used for the same state of the application.

## License

MIT
