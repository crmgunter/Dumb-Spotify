# Dumb Spotify

Dumb Spotify is an application that does a couple things. On the home page, the user is asked to log in to the app through Spotify - when they clicked Log In, they are redirected to a seperate back end app where the user is prompted to log in to Spotify through oAuth. Once logged in, they are redirected back to Dumb Spotify which now has access to the user's Spotify information. The app also gets the user's location by calling to the Google geolocation API which returns the user's coordinates. It then feeds those coordinates into an API call to the Google Maps API which returns an address for the user. This currently only works if connected to wifi. 

Once the user has logged in through Spotify, they can see their top 50 artists and songs. When artists are shown, the user can click an artist which triggers an API call to Bands In Town to return that artists upcoming events. If that artist has an event in the user's city, it will display the event date and location, otherwise, it will give an option to see all events the artist has. This is done by matching the event's city with the user's current location. 

Users also have the option to see their Spotify playlists, add and remove songs from them, as well as create new playlists. This all affects the user's actual spotify account in real time so if they add a song to a playlist through this app, it actually adds the song to the user's Spotify account. 

In the future I would like to allow a user to generate playlists based on their favorite artists. I also plan to add in a feature that shows bands playing in the users town based on their favorite artists.

This is a MERN stack application, though currently the back end is functional but not really being used. It does store the Spotify user's information to the database.

### Technologies used: 
MongoDb
React
Express
Node
Spotify API
Google Geolocation API
Google Maps API
Bands In Town API

### Link to deployed App: 
https://cgfinalproject.herokuapp.com/

### Link to trello:
https://trello.com/b/8lBQDfa2/final-project

Link to ERD and Wireframe:
https://imgur.com/a/efcNc
