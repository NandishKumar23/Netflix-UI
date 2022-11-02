import React, { useEffect, useState } from "react"
import axios from "./axios"
import "./Row.css"
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"


const base_url="https://image.tmdb.org/t/p/original/"
function Row({title,fetchURL,isLargeRow}){
    const[movies,setMovies]=useState([])
    const[trailerUrl,setTrailerUrl]=useState("");

    useEffect(()=>{
        async function fetchData(){
          
          const request=await axios.get(fetchURL)  
          setMovies(request.data.results)
          return request
        }
        fetchData();
    },[fetchURL]);
    
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
  
    const handleClick=    (movie)=>{
         if(trailerUrl){
          setTrailerUrl("");
          
         
         }else{
          //console.log(movie.name)
          console.log(movie.id);
          // movieTrailer(movie?.original_name || "")
          movieTrailer( null, { tmdbId: movie.id } )
          .then((url)=>{
            console.log(url);
           // https://www.youtube.com/watch?v=pCjkXgaAST4
              const urlParam=new URLSearchParams(new URL(url).search);
              
              setTrailerUrl(urlParam.get("v"))
              console.log(trailerUrl)
          }).catch((error)=> console.log(error));   
         
         }
        }; 
        function _onReady(event) {
          // access to player in all event handlers via event.target
          event.target.pauseVideo();
        }
    return(
         <div className="row">
            <h2 className="row_title">{title}</h2>
          <div className="row_posters">
           {movies.map(movie=>(
            <img key={movie.id}
            onClick={()=> handleClick(movie)}
             className={`row_poster ${isLargeRow && "row_posterLarge"}`}
             src={`${base_url}${isLargeRow? movie.poster_path:movie.backdrop_path}`} alt={movie.name}></img>
           ))}

          </div>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} onReady={_onReady}/>}
         </div>
         
        
    
    ) 
}
export default Row;