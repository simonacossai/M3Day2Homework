async function loadData(album) {
    //get the songs for the given artist
    let res = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + album, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ec5577de62msh9d203d454724b43p1f3c08jsnad1a59a31f6f",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "useQueryString": true
        }
    })
    let songs = await res.json();
    return songs.data;
}

let albums = ["Eminem", "Linkin Park", "Murubutu"];

async function fetchAlbums() {
    let songsContainer = document.querySelector("#songs")
    albums.forEach(async album => {
        let songs = await loadData(album)
        let Container = document.createElement("div")
        Container.className = "container-fluid"
        Container.innerHTML = `<h3 class="sectionTitle mt-5 ml-5">
            Songs for ${songs[0].artist.name} 
        </h3>`
        let fetchedAlbum = document.createElement("div")
        fetchedAlbum.className = "song-row text-center mt-3 ml-5";
        songs.forEach(song => {
            let albumCard = document.createElement("div")
            albumCard.className ="col-lg-2  cards"
            albumCard.innerHTML =  `
            <img src="${song.album.cover_medium}" alt="David Bowie" class="song-card-image">
            <div class="song-card-info text-center">
            <i class="far fa-play-circle play2"></i>
              <p class="title ">${song.title}</p>
              <p class="album-title ">${song.album.title}</p>
              <p class="artist ">${song.artist.name}</p>
            </div>
          `   
          albumCard.addEventListener("click", (event) => {   
              let player = document.querySelector("#player")     
              let audioPlayer = document.querySelector("#audio-player")
              let songTitle= document.querySelector(".songTitle");
              let duration = document.querySelector(".duration");
              let singer = document.querySelector(".singer")
              let current = document.querySelector(".current");
              let fillbar = document.querySelector(".fill");
              songTitle.innerHTML = song.title
              singer.innerHTML = song.artist.name
              let selectedsong= audioPlayer.src;
              audioPlayer.src = song.preview;
              
              player.src=song.album.cover_small;
              audioPlayer.play()      
              
              
audioPlayer.addEventListener("timeupdate", function() {
    
    let position = audioPlayer.currentTime / song.duration;
    let timeRemaining = song.duration - audioPlayer.currentTime;
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = Math.floor(timeRemaining % 60);
    duration.innerHTML=  "-"+minutes+":"+seconds;
    fillbar.style.width = position * 100 + "%";
  });

let back = document.querySelector(".back");
let forth = document.querySelector(".forth");

back.addEventListener("click", 
  function() {
   
      audioPlayer.currentTime -= 3;
  });
  
  forth.addEventListener("click", 
  function() {
  
    audioPlayer.currentTime += 3;
  });
              let stop = document.querySelector(".stop");
              stop.addEventListener("click", (event)=>{
                if(audioPlayer.paused) {
                    audioPlayer.play();
                  } else {
                    audioPlayer.pause();
                  }
              })
          })
          fetchedAlbum.appendChild(albumCard)
        })
        Container.appendChild(fetchedAlbum)
        songsContainer.appendChild(Container)
    })
}




let bands = ["Rancore", "Liam Gallagher", "Claver Gold"];

async function fetchAlbums1() {
    let songsContainer = document.querySelector("#songs")
    bands.forEach(async band => {
        let songs = await loadData(band)
        let Container = document.createElement("div")
        Container.className = "container-fluid"
        Container.innerHTML = `<h3 class="sectionTitle mt-5">
            Songs for ${songs[0].artist.name} 
        </h3>`
        let fetchedAlbum = document.createElement("ul")
        fetchedAlbum.className = "song-row text-center mt-3 ml-5";
        songs.forEach(song => {
            let albumCard = document.createElement("li")
            albumCard.className ="col-lg-2  cards"
            albumCard.innerHTML =  `
            <img src="${song.album.cover_medium}" alt="David Bowie" class="song-card-image">
            <div class="song-card-info text-center">
            <i class="far fa-play-circle play2"></i>
              <p class="title ">${song.title}</p>
              <p class="album-title">${song.album.title}</p>
              <p class="artist ">${song.artist.name}</p>
            </div>
          `   

          fetchedAlbum.appendChild(albumCard)
        })
        Container.appendChild(fetchedAlbum)
        songsContainer.appendChild(Container)
    })
}



function countUnique() {
    let albums = document.querySelectorAll(".album-title");
    let albumCounter = document.querySelector(".counter");
  
    let arrayOfAlbums = [];
  
    for (let i = 0; i < albums.length; i++) {
        if(!arrayOfAlbums.includes(albums[i].innerText)){
        arrayOfAlbums.push(albums[i].innerText);
        }
    }
    albumCounter.innerText = arrayOfAlbums.length;
  }