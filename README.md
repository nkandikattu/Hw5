## Hw5
Team Members: <br />
Siddhita Joshi, siddhitasandip.joshi@sjsu.edu <br />
Neeha Kandikattu, neeharika.kandikattu@sjsu.edu <br />
Pavan Koushik Kommuri, pavankoushik.kommuri@sjsu.edu

# Steps to run the Front End
1. cd client && npm install && npm run build
2. cd .. && npm install &&  node index.js

# Steps to run the Back End
1. cd server && npm install
2. node index.js

# Note about Config.js

Due to using React for our frontend framework and Express for our backend/server framework, we have three Config.js files: one for the frontend, one for the backend, and one to test the Click-Jacking attack. They are all identical, but in order to change the port the app runs on, all Config files will need to be altered. The frontend Config file can be found at ./client/config/Config.js. The backend Config file can be found at ./server/configs/Config.js. The click-jacking Config file can be found at ./Config.js. (Note that the client folder is config, the server folder is configs.)

# Testing Click Jacking on Login Pages

## Testing Secure Login Page

Login page is secure from click jacking, which means login page cannot be loaded into iframes of other websites. When tried, the page will be showing the relevant messages.

1. Open the clickjacklogin.html page to check the security of login page
(Note): this html page tries to load login page using iframe. check html source code for further information.
2. Once opened, the page should be showing insecure relevant messages.

## Testing Insecure Login Vulnerable Page
Login vulnerable page is insecure from click jacking, which means other websites can load this page using iframe and make user click on the desired buttons with out him knowing.

1. Open the clickjackloginvulnerable.html page to check the insecurity of login vulnerable page.
(Note): this html page tries to load login vulnerable page using iframe. check html source code for further information.
2. Once opened, the page should be showing the actual login page without reporting user about the possible insecurity.
3. Click on login option below the submit, which will redirect to secure login page, and shows the insecurity message inside the iframe.
