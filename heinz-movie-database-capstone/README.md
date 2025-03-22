# Movie Database Application

A frontend capstone project that allows users to search for movies and view detailed information using the OMDB API.

## Features

- Search for movies by title
- View detailed information about a specific movie
- Add/remove movies to favorites
- Responsive design for mobile, tablet, and desktop
- Dark/light mode support
- Pagination for search results

## Project Structure

```
movie-database/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
├── README.md
├── vite.config.js
└── tailwind.config.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OMDB API key (get yours at [omdbapi.com](https://www.omdbapi.com/apikey.aspx))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mwamachi95/alx-fe-reactjs/tree/main/heinz-movie-database-capstone
   cd movie-database
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your OMDB API key:

   ```
   VITE_OMDB_API_KEY=your_omdb_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

## Deployment

The application can be deployed to platforms like Netlify, Vercel, or GitHub Pages.

### Netlify Deploy

1. Push your code to GitHub.
2. Log in to Netlify and click "New site from Git".
3. Select your repository and configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add your environment variables (VITE_OMDB_API_KEY) in the site settings.
5. Deploy your site!

## Technologies Used

- React
- Vite
- Tailwind CSS
- React Router
- OMDB API

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OMDB API](https://www.omdbapi.com/) for providing movie data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for routing
