//var keys = require('keys.js');
var request = require('request');
var args = process.argv;
var command = process.argv[2];



//request will call the OMDB API

//take in argvs 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'

//my-tweets will show last 20 tweets and when they were created 

//spotify-this-song 'song name here' will show
  //artist, song name, preview link of the song, album, song name
  //no song provided default to 'what's my age again' by blink 182

//movie-this 'movie name here' will show
  //title, year, imdb rating, country, language, plot, actors, rotten tomatoes rating, RT URL
  //no movie provided default to 'Mr. Nobody'
  //RT rating and URL are now OPTIONAL
if (command === "movie-this" && args.length > 3){

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
