# Tweeter Project

Tweeter is a simple single-page AJAX-based Twitter-like clone that uses jQuery, HTML5 and plain CSS3 to help get comfortable with front-end technologies.

![](./images/readme-homepage.png)

---
## Contents
1. [Features](#features)
2. [Extra Features](#extra-features)
3. [Future Plans](#future-plans)
4. [Quick Start](#quick-start)
5. [Detailed Operation](#detailed-operation)
6. [Known Bugs](#known-bugs)
8. [Updates](#updates)
---
## Features
- Easy to use
- Mobile and Desktop Friendly
  - Mobile view under 1024 pixels
- Slide open & close 'new tweet' box depending on click and scroll location
- Escape text to ensure no one can change html script

![](./images/readme-mobileview.png)

[( back to top 🔺)](#about)

---
## Extra Features
- Light and Dark Mode
- Flag Tweet (blurs out tweet), Like Tweet (turns heart red), Retweet (copies and pastes to tweet input area)
- Generate random tweet from array of tweets
- Show Favourites (shows only liked tweets)
- Various tool tips
- Various animations on Back to Top, Tweet Submit Button, and Generate 
Random Tweet 
- Charater count with warning if close to max characters and over max characters
- Tweet input validation on submit (too long/no tweet)
- Loads 10 tweets initially and more on click 'load more tweets'
- Badge counter for liked tweets and remaining tweets to load
- Local storage used to remember flagged tweets, liked tweets, light and dark mode and fav tweets list
- Hand pointer on clickable elements
- _Stretch_: 'Back To Top' toggle On/Off depending on scroll location
- _Stretch_: CSS uses SASS with nested, variables, mixins, extend

![](./images/readme-darkmode.png)

[( back to top 🔺)](#about)

---
## Future Plans
- Create proper storage instead of using local storage
- Add function to pull random tweets from API

[( back to top 🔺)](#about)

---
## Quick Start
1) [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository in GitHub. 
2) Clone your repository to your local device.
3) Install dependencies with  
  `npm install`   
4) Start the Tweeter Server in your terminal with `nodemon`  
  `npm run local`
5) Start the web app in your browser with  
  `localhost:8080`

[( back to top 🔺)](#about)

---
## Detailed Operation
1) [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository in GitHub. 
2) Clone your repository to your local device.
3) Install dependencies with  
  `npm install`   
4) Start the Tweeter Server in your terminal with `nodemon`  
  `npm run local`
5) Start the web app in your browser with  
  `localhost:8080`
6) 

![](./images/2022-09-12%2015-29-54.mov)

[( back to top 🔺) ](#about)

----
## Known Bugs
- When click action is to scroll to certain location on page -> loads at top then scroll to location

[( back to top 🔺)](#about)

----
## Updates
- Get the most recent version of Tweeter! [on our GitHub account here.](https://github.com/jradigan17/tweeterjr).
- Change Log v 0.0 - 2022-09-12:  
    * (implementation)

[( back to top 🔺)](#about)

---
## Dependencies

- express
- node 5.10.x or above
- body-parser
- chance
- md5
- nodemon

[( back to top 🔺)](#about)

---