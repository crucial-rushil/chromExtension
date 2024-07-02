# chromExtension

backend and frontend must run together:

backend:
- cd backend
- npm install
- npm start

run frontend:
- cd house-review
- npm run build
- go to chrome://extensions and click "load unpacked"
- select the "build" directory (chromExtension/house-review/build)

How to Make Changes:
- locally make changes
- npm run build
- hit the reload button in the extension on chrome://extensions
