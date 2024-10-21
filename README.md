# Installation

1. Clone the repository to your machine;
2. Go to `crud-api` branch via running `git checkout crud-api`;
3. Run `npm install` to install all the packages;
4. Rename `.env.example` file to `.env`.

# Running the application

1. Run `npm run dev` for single-threaded development mode;
2. Run `npm run prod` for single-threaded production mode(bundles typescript files into `dist` directory and runs the build);
3. Run `npm run start:multi` for multi-threaded development mode;
4. Run `npm run test` to test the app.

# Example of user creation and user getting from terminal
1. Type in bash terminal 
--
curl -X POST http://localhost:4000/api/users \
-H "Content-Type: application/json" \
-d '{"username": "JohnDoe", "age": 25, "hobbies": ["reading", "gaming", "hiking"]}'
--

2. Type in bash terminal  -  curl http://localhost:4000/api/users