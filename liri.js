//twitter keys
var keys = require('./keys.js');

var fs = require('fs');

//request will call the OMDB API
var request = require('request');

var twitter = require('twitter');
var spotify = require('spotify');

//take in all arguments
var args = process.argv;

//take in arguments 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'
var command = process.argv[2];

//creates var for the twitter keys
var client = new twitter(keys.twitterKeys)

//my-tweets will show last 20 tweets and when they were created 
if (command === "my-tweets"){
  RunTwitter();
}

if (command === "spotify-this-song"){
  RunSpotify();  
}

if (command === "movie-this"){
  RunMovie();
}

if (command === "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(error, data){
    var dataArray = data.split(',');

    var func = dataArray[0];

    if (func === "my-tweets"){
      RunTwitter();
    }
    if (func === "spotify-this-song"){
      args = dataArray[1].split(' ');
      RunSpotify();
    }
    if (func === "movie-this"){
      args = dataArray[1].split(' ');
      RunMovie();
    }

  });
}

//------------------------------------------------------
//functions
//------------------------------------------------------

function RunTwitter(){

  var params = {imdoingitlive: 'nodejs'}

  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error){
      for (var i=0; i < 20; i++){
        console.log("----------");
        console.log("Tweet " + (i + 1) + ": " + tweets[i].text);
        console.log(" tweeted on " +tweets[i].created_at);
      }
    }
  });
}

function RunSpotify(){
  
  if (args.length > 3){
    var songName = "";

    for (var i=3; i<args.length; i++){
      if (i>3 && i< args.length){
        songName = songName + "+" + args[i];
      }
      else {
        songName = songName + args[i];
      }
    }

    spotify.search({type: 'track', query: songName}, function(error, data){
      if (!error){
        for (var i=0; i < 20; i++){
          console.log("----------");
          console.log("Artist: " + data.tracks.items[i].artists[0].name);
          console.log("Song Name: " + data.tracks.items[i].name);
          console.log("Preview URL: " + data.tracks.items[i].preview_url);
          console.log("Album: " + data.tracks.items[i].album.name);
        }
      }
    });
  }
  else {
    spotify.search({type: 'track', query: "blink 182 what's my age again"}, function(error, data){
      if (!error){
          console.log("----------");
          console.log("Artist: " + data.tracks.items[0].artists[0].name);
          console.log("Song Name: " + data.tracks.items[0].name);
          console.log("Preview URL: " + data.tracks.items[0].preview_url);
          console.log("Album: " + data.tracks.items[0].album.name);
      }
    });
  }

}

function RunMovie(){
  
  if (args.length > 3){
    var movieName = "";

    for (var i=3; i<args.length; i++){
      if (i>3 && i< args.length){
        movieName = movieName + "+" + args[i];
      }
      else {
        movieName = movieName + args[i];
      }
    }

    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json';

    request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("Title: " + JSON.parse(body)["Title"]);
        console.log("Release Year: " + JSON.parse(body)["Year"]);
        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Country: " + JSON.parse(body)["Country"]);
        console.log("Language: " + JSON.parse(body)["Language"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
      }
    });
  }
  else {
    var queryUrl = 'http://www.omdbapi.com/?t=Mr.%20Nobody&y=&plot=short&r=json';

    request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("Title: " + JSON.parse(body)["Title"]);
        console.log("Release Year: " + JSON.parse(body)["Year"]);
        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Country: " + JSON.parse(body)["Country"]);
        console.log("Language: " + JSON.parse(body)["Language"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
      }
    });
  }

}