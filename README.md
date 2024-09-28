# House Reviewer 🏠 (Chrome Extension for Realtor.com) 
House Reviewer is a way to rate houses listed for sale on realtor.com. People can let others know how a property is and any concerns they have. All reviews are screened for profanity and inappropiate slurs by a content moderation machine learning model. 

Instructions for how to Run Locally: 

Backend:
- cd backend
- npm install
- npm start

content moderator:
- cd content_mod
- pip3 install -r requirements.txt
- python3 -m flask --app content_moderation run

run frontend:
- cd house-review
- npm install
- npm run build
- go to chrome://extensions and click "load unpacked"
- select the "build" directory (chromExtension/house-review/build)

How to Make Changes:
- locally make changes
- npm run build
- hit the reload button in the extension on chrome://extensions

Note: this project requires Node.js and Flask
