# House Reviewer 🏠 (Chrome Extension for Realtor.com) 
House Reviewer is a platform for rating and reviewing properties listed for sale on Realtor.com. It enables users to share their insights and raise concerns about homes, helping others make informed decisions. All reviews are screened for inappropriate content, including profanity and slurs, using an advanced content moderation machine learning model to ensure a respectful and constructive environment.

⚙️ Instructions for Running Locally:

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
