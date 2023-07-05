import { API_KEY } from "./config.js";

const url = 'https://netflix54.p.rapidapi.com/search/?query=all&offset=0&limit_titles=50&limit_suggestions=20&lang=en';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': API_KEY,
		'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
	}
};



document.addEventListener('DOMContentLoaded', ()=> {
    const searchBtn = document.getElementById('btn-search')
    searchBtn.addEventListener("click", (e)=> {
        e.preventDefault()
        const search = document.getElementById('search').value
        // searchMovies(wrapped)
    })
})

async function get() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        const data = await data;
    } catch (error) {
        console.error(error);
    }
}

// Search movies by name
const searchMovies = (search)=> {
    fetch(`https://netflix54.p.rapidapi.com/search/?query=${search}&offset=0&limit_titles=50&limit_suggestions=20&lang=en`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .then(data => data)
    .catch(error => error)
}

// Fetches movie data from api
const getTitles = ()=> {
    fetch(url, options)
    .then(response => response.json())
    .then(data => renderTitles(data))
    .catch(error => error)
}
getTitles()

// Renders fetched data on the html page
const renderTitles = (data) => {
    
    const shows = data.titles.filter(show => show.jawSummary.type === "show" && show.jawSummary.watched === false)
    const movies = data.titles.filter(movie => movie.jawSummary.type === "movie" && movie.jawSummary.watched === false)
  
    const trendingShows = data.titles.filter(wshow => wshow.jawSummary.watched === true)
    const typeMovies = data.titles.filter(wmovie => wmovie.summary.type === 'movie')
    const watchedMovies = typeMovies.filter(wshow => wshow.jawSummary.watched === true)

    movies.map(movie => {
        const moviesUl = document.querySelector('.suggested-shows')
        const li = createMovieCard(movie)
        moviesUl.append(li)
    })
    
    shows.map(show => {
        const showsUl = document.querySelector('.shows')
        const li = createMovieCard(show)
        showsUl.append(li)
    })

    trendingShows.map(wshow => {
        const watchedUl = document.querySelector('.trending-list')
        const li = createTrendingItemCard(wshow)
        watchedUl.append(li)
    })
}

// const createShow = (item)=> {
//     const li = document.createElement("li")
//         li.className = 'title'
//         li.innerHTML = `
//         <article class="show">
//             <div class="show-poster">
//                 <img src="${item.jawSummary.backgroundImage.url}" alt="poster" class="tile-poster">
//             </div>
//             <div class="show-body">
//             <h4 class="title">${item.jawSummary.title}</h4>
//             <p>Seasons: ${item.jawSummary.seasonCount}</p>
//                 <div class="info">
//                 <i class="fa-solid fa-star"></i> 4.7
//                 <p class="genre">${item.jawSummary.genres[1].name}</p>
//                </div>
//             </div>
//         </article>
//         ` 
//         return li;
// }


// Creates movie and series card template
const createMovieCard = (item)=> {
    const li = document.createElement("li")
    li.className = 'title'
    li.innerHTML = `
    <article class="show">
        <div class="show-poster">
            <img src="${item.jawSummary.backgroundImage.url}" alt="poster" class="tile-poster">
        </div>
        <div class="show-body">
        <h4 class="title">${item.jawSummary.title}</h4>
            <div class="info">
             <i class="fa-solid fa-star"></i> 4.7
             <p class="genre">${item.jawSummary.genres[0].name}</p>
            </div>
        </div>
    </article>
    `;
    return li;
}

// Created trending movie card template
const createTrendingItemCard = (item)=> {
    const li = document.createElement("li")

        li.className = 'trending-show'
        li.innerHTML = ` <article class="wshow">
        <div class="trending-show-poster">
            <img src="${item.jawSummary.backgroundImage.url}" alt="title-poster" class="trending-poster">
        </div>
        <div class="wshow-body">
            <h5 class="wtitle">${item.jawSummary.title}</h5>
                <div class="winfo">
                 <i class="fa-solid fa-star"></i> 4.7
                 <p class="wgenre">${item.jawSummary.genres[0].name}</p>
                </div>
            </div>
    </article>`
    return li;
}