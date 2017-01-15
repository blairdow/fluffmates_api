# FluffMates Backend
##About
A **Node.js + Express headless API** that is the backend for my Ionic mobile app, **[FluffMates](https://quiet-woodland-25469.herokuapp.com/)**. Built to follow Restful API specs. 

> The FluffMates app is designed to let users search for adoptable pets in their area, save their three favorites, and them have them delivered to their home, so the user can adopt their favorite pet of the three. 

This back end contains the user database built using **MongoDB and Mongoose**. It also makes calls to the **[Petfinder API](https://www.petfinder.com/developers/api-key)**, using user inputted search parameters sent from the front end, to return data about adoptable pets!

The GET route to /pets returns a JSON object of pets and their info that is passed to the front end and displayed in the browser. 

This app also contains the logic for user authorization using **JSON Web Tokens and Bcrypt**.  A user is allowed to stay logged for thirty days, even if they leave the app. This was employed to make the experience more seamless for the user. 

> See the FluffMates front end Github [here](https://github.com/blairdow/fluffmates).

> Check out my other work on my [portfolio site](https://blairdow.github.io)!

##Deployment
####To deploy this app on your own:

1. Download or fork this repo. 
 
2. Create a .env file in the app and get your own API key from [Petfinder](https://www.petfinder.com/developers/api-key). Save it in your .env file. Make sure this file is in your .gitignore to keep the API key secure. You will also need to save your JSON Web Tokens secret in this file to allow user authorization.

2. Deploy on hosting site of your choice. (I used [Heroku](www.heroku.com).) If using Heroku, you will need to set up MLab URI for the user database. 
	
	>Note: This is a headless API. There are no views. You can use it to build your own front end, or deploy it along with my [front end](https://github.com/blairdow/fluffmates). 




