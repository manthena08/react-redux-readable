This is a Readable Application. You can see different categories of posts avaiable and you can also add new posts for avaiable categories.

## What You're Getting
```
+--public/    
 |-- index.html - DO NOT MODIFY
 |-- favicon.ico - React Icon, You may change if you wish.
+-- src/
 +-- actions/
  |-- actionTypes.js - This contain all the actions types used
  |-- categories.js - All the actions related to categories
  |-- post.js - All the actions related to posts
 +--components/
  |-- App.js - This is the root of your app. Contains static HTML right now.
  |-- App.css - Styles for your app. Feel free to customize this as you desire.
  |-- App.test.js - Used for testing. Provided with Create React App.
  +-- category/ - has all the components related to categories
  +-- comments/ - Components realted to comments
  +-- common/ - All teh common components used across the app.
  +-- home/ - This is the root/default page
  +-- posts/ - All the components related to posts
 +-- reducers/
  |-- index.js - This is the root reducer which combines all the avaiable reducers
  |-- categories.js - Contains all the reducers of categories
  |-- posts.js - Contains all the reducers of posts
 +-- store/ - All the store information
 +-- utils/
 |-- ReadableAPI.js - A JavaScript API to access backend. 
 Instructions for the methods are below.
 |-- index.js - You should not need to modify this file. It is used for DOM rendering only.
 |-- index.css - Global styles. You probably won't need to change anything here.
|-- .gitignore 
|-- CONTRIBUTING.MD - Information about contributing to this repo. 
TL;DR - Fork and clone your own version of this to use it.
|-- README.MD - This README file.
for you to use with your app.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
```

##Installation Details
### Run 
    npm install
    npm start

## How to Use
This application has a main root pages which is displayed with all the categories aviable and all the posts. When clicked on specific category or post it will take you to that specific page. Play around by adding deleting posts or comments.

## API 
Clone https://github.com/manthena08/react-readable-api.git project which serves as the backend for this application.