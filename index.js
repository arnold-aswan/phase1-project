import { API_KEY } from "./config.js";

const url = 'https://netflix54.p.rapidapi.com/search/?query=all&offset=0&limit_titles=60&limit_suggestions=20&lang=en';
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
        let wrapped = search;
        
        if(!('"' === wrapped[0] && '"' === wrapped.slice(-1))) {
            wrapped = `"${wrapped}"`
            console.log(wrapped);
            // searchMovies(wrapped)
        }
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

// get()

const searchMovies = (search)=> {
    fetch(`https://netflix54.p.rapidapi.com/search/?query=${search}&offset=0&limit_titles=50&limit_suggestions=20&lang=en`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .then(data => data)
    .catch(error => error)
}

const getTitles = ()=> {
    fetch(url, options)
    .then(response => response.json())
    .then(data => renderTitles(data))
    .catch(error => error)

    // .then(response => console.log(response.suggestions[0].summary.name))
    // .then(data => console.log(data.suggestions.sumary.name))
}
getTitles()

const renderTitles = (data) => {
    // console.log(data);
    
    const shows = data.titles.filter(show => show.jawSummary.type === "show")
    const movies = data.titles.filter(movie => movie.jawSummary.type === "movie")
  
    console.log(shows);
    console.log(movies);

    movies.map(movie => {
        const moviesUl = document.querySelector('.suggested-shows')
        const li = document.createElement("li")
        li.className = 'title'
        li.innerHTML = `
        <article class="show">
            <div class="show-poster">
                <img src="${movie.jawSummary.backgroundImage.url}" alt="poster" class="tile-poster">
            </div>
            <div class="show-body">
            <h4 class="title">${movie.jawSummary.title}</h4>
                <div class="info">
                    <small class="title-description">${movie.jawSummary.synopsis}</small>
                </div>
                <button class="btn-watch">Watch Now</button>
            </div>
        </article>
        ` 
        moviesUl.append(li)
    })
    
    shows.map(show => {
        // console.log(show);
        const showsUl = document.querySelector('.shows')
        const li = document.createElement("li")
        li.className = 'title'
        li.innerHTML = `
        <article class="show">
            <div class="show-poster">
                <img src="${show.jawSummary.backgroundImage.url}" alt="poster" class="tile-poster">
            </div>
            <div class="show-body">
            <p>Seasons: ${show.jawSummary.seasonCount}</p>
            <h4 class="title">${show.jawSummary.title}</h4>
                <div class="info">
                    <small class="title-description">${show.jawSummary.synopsis}</small>
                </div>
                <button class="btn-watch">Watch Now</button>
            </div>
        </article>

        ` 
        showsUl.append(li)
    })
}
