var keys = require('./keys.js');

var fs = require('fs');

//request will call the OMDB API
var request = require('request');

var twitter = require('twitter');
var spotify = require('spotify');

var args = process.argv;

//take in argvs 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'
var command = process.argv[2];

//creates var for the twitter keys
var client = new twitter(keys.twitterKeys)

//my-tweets will show last 20 tweets and when they were created 
if (command === "my-tweets"){
  RunTwitter();
}

//spotify-this-song 'song name here' will show
  //artist, song name, preview link of the song, album, song name
  //no song provided default to 'what's my age again' by blink 182
if (command === "spotify-this-song" && args.length > 3){
  RunSpotify();  
}
else if (command === "spotify-this-song"){
  
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

//movie-this 'movie name here' will show
  //title, year, imdb rating, country, language, plot, actors, rotten tomatoes rating, RT URL
  //no movie provided default to 'Mr. Nobody'
  //RT rating and URL are now OPTIONAL
if (command === "movie-this" && args.length > 3){
  RunMovie();
}
else if(command === "movie-this"){
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
//do-what-it-says should use the fs node package to take the text inside of random.txt and use it to call the first command with the second part as it's parameter
  //so call the appropriate function and pass in "I Want it That Way" as the song
  //this should work for any function and parameter I use

if (command === "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(error, data){
    var dataArray = data.split(',');
    console.log(dataArray);

    var func = dataArray[0];

    if (func === "my-tweets"){
      RunTwitter();
    }
    if (func === "spotify-this-song"){
      RunSpotify();
    }
    if (func === "movie-this"){
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
        console.log("Tweet " + (i + 1) + ": " + tweets[i].text);
      }
    }
  });
}

function RunSpotify(){
  
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

function RunMovie(){
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