# House Reviewer 🏠 (Chrome Extension for Realtor.com) 
House Reviewer is a platform for rating and reviewing properties listed for sale on Realtor.com. It enables users to share their insights and raise concerns about homes, helping others make informed decisions. All reviews are screened for inappropriate content, including profanity and slurs, using an advanced content moderation machine learning model to ensure a respectful and constructive environment.

⚙️ Instructions for Running Locally:

## 📋 Backend:
* Make your own MongoDB cluster and insert the database connection URL into the .env file 
* Navigate to the backend directory using `cd backend`
* Run `npm install` to install the necessary dependencies
* Start the backend with `npm start`

## 📺 Content Moderator:
* Navigate to the content_mod directory using `cd content_mod`
* Install Python dependencies using `pip3 install -r requirements.txt`
* Start the Flask app with `python3 -m flask --app content_moderation run` 

## 👩‍💻 Frontend:
* Navigate to the house-review directory `cd house-review`
* Run `npm install` to install the dependencies
* Build the frontend using `npm run build`
* Open Chrome and go to chrome://extensions and click Load unpacked
* Select the build directory (chromExtension/house-review/build)

## 🔄 How to Make Changes:
* Make changes locally
* Run `npm run build` to rebuild the frontend
* Hit the reload button in the extension on chrome://extensions

Note: this project requires Node.js and Flask


