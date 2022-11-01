const mongoose = require("mongoose");

const moviemodelschema = mongoose.Schema({
    _id: String,
    original_title: String,
    adult: Boolean,
    genre_ids: [String],
    backdrop_path: String,
    original_language:String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    video: String,
    vote_average:Number,
    vote_count: Number,
});

const Movie =mongoose.model("movie", moviemodelschema);
module.exports = Movie;

// {"adult":false,
// "backdrop_path":"/y5Z0WesTjvn59jP6yo459eUsbli.jpg",
// "genre_ids":[27,53],
// "original_language":"en",
// "original_title":"Terrifier 2",
// "overview":"After being resurrected by a sinister entity, Art the Clown returns to Miles County where he must hunt down and destroy a teenage girl and her younger brother on Halloween night.  As the body count rises, the siblings fight to stay alive while uncovering the true nature of Art's evil intent.",
// "popularity":6912.168,
// "poster_path":"https://image.tmdb.org/t/p/w500//yw8NQyvbeNXoZO6v4SEXrgQ27Ll.jpg",
// "release_date":"2022-10-06",
// "title":"Terrifier 2",
// "video":false,
// "vote_average":7.3,
// "vote_count":287,
// "_id":663712}