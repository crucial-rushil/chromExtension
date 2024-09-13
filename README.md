# chromExtension

backend and frontend must run together:

backend:
- cd backend
- npm install
- npm start

content moderator:
- cd content_mod
- pip3 install -r requirements.txt
- python3 -m flask --app content_moderation run

run frontend:
- cd house-review
- npm run build
- go to chrome://extensions and click "load unpacked"
- select the "build" directory (chromExtension/house-review/build)

How to Make Changes:
- locally make changes
- npm run build
- hit the reload button in the extension on chrome://extensions

How to Test Backend Routes:
- use postman and send requests to localhost:4000/[route_name] and debug
