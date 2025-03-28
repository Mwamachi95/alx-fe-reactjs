# Tazama Movie Database

## Project Overview

Tazama is a movie database application built with React that allows users to search for movies, view details, and save favorites. The application features a visually striking interface with dynamic transitions, thoughtful animations, and responsive design.

## Design & UI

Based on the Figma mockups, the application features a distinctive color scheme of mustard yellow and navy blue. The UI is inspired by streaming platforms like Netflix, with an emphasis on visual appeal and smooth user experience, while maintaining its own unique identity.

## Animations & Visual Effects

### Logo Animation

- **Tazama Text Animation**: Custom text-based animation for the "tazama" logo when users first land on the website
  - Inspired by Netflix's animation but with unique characteristics specific to Tazama
  - Implemented using CSS animations and transitions (not SVG or PNG-based)
  - Provides a memorable first impression and brand recognition

### Landing Page Background

- **Animated Tailwind CSS Background**: Dynamic, animated background using Tailwind CSS
  - Subtle motion effects that enhance the visual experience without distracting from content
  - Optimized for performance across devices
  - Complements the mustard yellow and navy blue color scheme

## Pages & Components

### 1. Landing Page

- **Animated Header**: Features the animated "tazama" text logo centered on the dynamic background
- **Featured Movies Carousel**: Auto-transitioning featured movie cards that expand to show details on hover/selection
- **Project Description**: Brief description of the application's purpose and functionality
- **Navigation**: Button to enter the main application (labeled "Login")
- **Footer**: Social media links (X, GitHub, LinkedIn) for sharing and portfolio reference

### 2. Home Page

- **Top Navigation Bar**:
  - Search input field with magnifying glass icon
  - Navigation button on right side
  - Tazama branding on right corner (varies by layout)
- **Side Navigation**:
  - Collapsible sidebar that expands on hover
  - Icons for Home and Favorites
  - User profile icon at top
  - Back button at bottom
  - Styled with mustard yellow or navy blue accents
- **Movie Grid**:
  - Displays movie posters in a responsive grid
  - "Acclaimed Movies" section highlighting top films
  - Movie cards show minimal info, expand on hover
- **Background**: Changes to reflect the currently highlighted/selected movie
- **Footer**: Social media links consistent with landing page

### 3. Movie Details Page

- **Expanded Layout**: When a movie is selected, its details are displayed prominently
- **Information Display**:
  - Movie title
  - Release year, runtime, and genre
  - Plot summary
  - Cast information (when available)
- **Visual Presentation**:
  - Movie poster or key art as background
  - Text overlaid with appropriate contrast
  - Consistent with the app's color theme of mustard yellow and navy blue
- **Navigation**: Same side and top navigation as Home page
- **Back Button**: Prominent option to return to previous screen

### 4. Favorites Page

- **Saved Content**: Grid display of user's favorite movies
- **Functionality**: Same interaction model as Home page
- **Visual Distinction**: Possibly different accent color or indicator showing this is the favorites collection

## Functional Requirements

### Navigation System

- **Side Navigation Behavior**:
  - Expands to show text labels when hovered
  - Collapses to icons when mouse moves away
  - Provides visual feedback for current section
- **Back Button Functionality**:
  - Returns user to previous page in navigation history
  - Maintains state where appropriate

### Movie Card Interaction

- **Hover Effects**:
  - Cards expand slightly on hover (scale transform)
  - Additional information appears
- **Background Change**:
  - Selected/hovered movie influences the page background
  - Smooth transitions between states

### Search Functionality

- **Real-time Results**: Updates as user types
- **Visual Feedback**: Clear indication of search state and results

### Favorites System

- **Add/Remove**: Toggle functionality for adding movies to favorites
- **Persistence**: Saves user preferences between sessions (localStorage)
- **Synchronization**: Consistent state across different pages of the app

## Color Themes & Styling

- **Primary Color Scheme**:
  - Mustard yellow and navy blue as the primary colors
  - High contrast for readability
  - Consistent application throughout the interface
- **Card Design**:
  - Subtle shadows
  - Rounded corners
  - Semi-transparent overlays for text on images

## Responsive Design

- **Layout Adaptation**:
  - Adjusts for mobile, tablet, and desktop views
  - Side navigation transforms appropriately for smaller screens
- **Touch-friendly**: Larger tap targets on mobile
- **Maintained Aesthetics**: Core visual identity preserved across device sizes

## Implementation Notes

- Use React Router for navigation
- Implement context for theme and favorites management
- Use Framer Motion or CSS animations for smooth transitions and the logo animation
- Utilize Tailwind CSS for responsive design and the animated background
- Integrate with OMDB API as specified in requirements

## Animation Technical Details

- **Logo Animation**:
  - Implement with CSS keyframes and transforms
  - Consider letter-by-letter reveal with slight timing offsets
  - Add subtle glow or color transition effects
- **Background Animation**:
  - Use Tailwind CSS utilities combined with custom animation classes
  - Consider subtle gradient shifts or geometric pattern movements
  - Ensure animations are non-intrusive and performance-optimized

## Browser Compatibility

- Ensure functionality in Chrome, Firefox, Safari, and Edge
- Graceful fallbacks for older browsers

---

This implementation balances visual appeal with functional requirements, creating an engaging movie browsing experience with a distinct visual identity featuring thoughtful animations and the mustard yellow and navy blue color scheme.

tazama-movie-database/
├── public/
│ ├── favicon.ico
│ └── index.html
├── src/
│ ├── assets/
│ │ ├── images/
│ │ │ └── placeholder.png
│ │ └── icons/
│ │ ├── favorite.svg
│ │ ├── home.svg
│ │ ├── search.svg
│ │ ├── back.svg
│ │ ├── user.svg
│ │ └── social/
│ │ ├── github.svg
│ │ ├── linkedin.svg
│ │ └── x-twitter.svg
│ ├── components/
│ │ ├── animations/
│ │ │ ├── LogoAnimation.jsx
│ │ │ ├── BackgroundAnimation.jsx
│ │ │ └── CardTransition.jsx
│ │ ├── common/
│ │ │ ├── ErrorMessage.jsx
│ │ │ ├── Loading.jsx
│ │ │ ├── Pagination.jsx
│ │ │ └── SocialLinks.jsx
│ │ ├── layout/
│ │ │ ├── Footer.jsx
│ │ │ ├── Header.jsx
│ │ │ ├── SideNavigation.jsx
│ │ │ ├── TopNavigation.jsx
│ │ │ └── Layout.jsx
│ │ ├── movie/
│ │ │ ├── MovieCard.jsx
│ │ │ ├── MovieDetails.jsx
│ │ │ ├── MovieList.jsx
│ │ │ ├── MovieCarousel.jsx
│ │ │ ├── AcclaimedMovies.jsx
│ │ │ └── SearchBar.jsx
│ │ └── favorites/
│ │ ├── FavoriteButton.jsx
│ │ └── FavoritesList.jsx
│ ├── hooks/
│ │ ├── useDebounce.js
│ │ ├── useFetchMovies.js
│ │ ├── useLocalStorage.js
│ │ └── useAnimationState.js
│ ├── pages/
│ │ ├── LandingPage.jsx
│ │ ├── HomePage.jsx
│ │ ├── MovieDetailsPage.jsx
│ │ └── FavoritesPage.jsx
│ ├── services/
│ │ ├── api.js
│ │ └── localStorage.js
│ ├── styles/
│ │ ├── animations.css
│ │ ├── theme.js
│ │ └── tailwind.css
│ ├── utils/
│ │ ├── constants.js
│ │ ├── helpers.js
│ │ └── animationHelpers.js
│ ├── contexts/
│ │ ├── FavoritesContext.jsx
│ │ └── ThemeContext.jsx
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── .env
├── .gitignore
├── package.json
├── README.md
├── vite.config.js
└── tailwind.config.js
