const axios = require('axios');
const filesystem = require('fs');

var pages=1;

const fetch_movies = async (page) => {
  const fetchurl = `https://api.themoviedb.org/3/movie/now_playing?api_key=715b1d719d2bb061cb2a26598b39fe11&page=${page}&region=us`;

  try {
    const resp = await axios({
        method: 'GET',
        url: fetchurl,
        headers: {'Content-Type' : "application/json"}      
    });

    // resp.data['results'];
    
    pages=resp.data['total_pages'];
    console.log(pages);
    for(var i=0;i<resp.data['results'].length;i++){
      resp.data['results'][i]._id = resp.data['results'][i]['id'];
      delete resp.data['results'][i].id;
      resp.data['results'][i]['poster_path']='https://image.tmdb.org/t/p/w500/'+resp.data['results'][i]['poster_path'];
    }
    // console.log(resp.data['results']);
    return resp.data['results'];
    
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
}

var i=0;
var data =[];
(async () => {
  while(i<pages){
    let d=await fetch_movies(i+1);
    data=data.concat(d);
    console.log('fetched page ',i+1);
    console.log("pages from outside",pages);
    i++;
  }
  console.log(data);
  filesystem.writeFile('moviedump.json', JSON.stringify(data), function (err) {
    console.log(err);
  });

})();


