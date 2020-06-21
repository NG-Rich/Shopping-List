# Kart

* [Setup](#setup)
* [Testing](#testing)
* [Usage](#usage)
* [Notes](#notes)

### Setup
Setup is simple since you just need to run `npm start` (if you have npm installed) and the app is up and running!

### Testing
I've made test specs if you wish to run tests on the app features.  
1. `static_spec.js` which tests the landing page.
2. `user_spec.js` which tests behavior of account creation.
3. `users_spec.js` which tests for user resource.
4. `items_spec.js` which tests for item resource.
5. `item_spec.js` which test for item behavior.


All can be run with `npm test spec/(spec_folder)/(test_spec_here.js)`.
(Further specs will be available when features are in progress)

### Usage
Launching the app brings you to the landing site in which you can get started by creating an account. After, you'll be presented with the option to get started in creating a list or viewing your created lists. As a user you'll have the option to add items to your list once you've named a list. For every item created, it will be unmarked as it's set to be not purchased by default. In other to change it's status, you edit the item and change it.

### Notes
For all the packages used, I've had about a year or two of solid use and was accustomed to using these over other choices due to familiarity. I did want to switch on using Request (since it's been deprecated) for Axios for HTTP request testing but it was a bit out of my base of knowledge with limited time. This was my first time implementing the use of WebSockets, so using SocketIO was completely new to me as I've had zero time to utilize it. In the end, I was able to utilize list and item creation along but if I had more time to complete the project I would've been able to implement the full feature of real time syncing of item features. 

I actually came close to the implementation if you view my `server.js` and `show.ejs` (within my list views), but the problem I faced was figuring out how to send the data from input into the server as it was only displaying the added items successfully between two opened tabs but upon refresh the items failed to save. Attempting to fiddle around with the implementation of emitting the result either left me with items that did not save or an item successfully being added but not appearing on the other tab. What I had initially hoped I would've been able to do afterwards was to slap on React for a cleaner smooth UX but that would've been only after everything else was completed.

Overall, I had fun trying something new with WebSockets and am eager to dive into it with more time at hand because the opportunities are endless. It does open up to me that I need to work on gathering more data and research upon tackling a tool that is foreign to me especially given my field I would be running into new technologies since programming is always evolving.

https://ng-rich-kart.herokuapp.com/

* Node.js
* Express
* EJS
* Passport
* Sequelize (PostGres)
* Bcrypt
* Bootstrap
