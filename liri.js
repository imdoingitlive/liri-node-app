var keys = require('keys.js');

//install npm packages twitter, spotify, request
  //request will call the OMDB API

//take in argvs 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'

//my-tweets will show last 20 tweets and when they were created 

//spotify-this-song 'song name here' will show
  //artist, song name, preview link of the song, album, song name
  //no song provided default to 'what's my age again' by blink 182

//movie-this 'movie name here' will show
  //title, year, imdb rating, country, language, plot, actors, rotten tomatoes rating, RT URL
  //no movie provided default to 'Mr. Nobody'

//do-what-it-says should use the fs node package to take the text inside of random.txt and use it to call the first command with the second part as it's parameter
  //so call the appropriate function and pass in "I Want it That Way" as the song
  //this should work for any function and parameter I use
