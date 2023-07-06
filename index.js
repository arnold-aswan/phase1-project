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
    const overlay = document.querySelector('.overlay')
    const form = document.querySelector('.form-control')
    form.addEventListener("submit", (e)=> {
        e.preventDefault()
        const search = document.getElementById('search').value
        let wrapped = search
        if(wrapped[0] !== '"' && wrapped.slice(-1) !== '"') {
            wrapped = `'${wrapped}'`
            const sch = document.querySelector('.search-results')
            overlay.classList.toggle('show')
            sch.classList.toggle('hide')
            searchMovies(wrapped)
        }
    })

    const viewMoreBtn = document.querySelector('.btn-more')
    viewMoreBtn.addEventListener("click", (e)=> {
        const movies = document.querySelector('.suggested-movies')
        movies.classList.toggle('clip')
        if(movies.classList.contains('clip')) {
            e.target.innerText = `View Less`
        } 
    })

    overlay.addEventListener("click", (e)=> {
        const searchResults = document.querySelector('.search-results')
        searchResults.classList.toggle('hide')
        overlay.classList.toggle('show')
    })
    // getTitles()
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
    .then(data => renderSearchedItems(data))
    .catch(error => error)
}

// Fetches movie data from api
const getTitles = ()=> {
    fetch(url, options)
    .then(response => response.json())
    .then(data => renderTitles(data))
    .catch(error => error)
}
// Renders and filters search results
const renderSearchedItems = (data)=> {
    const search = document.getElementById('search').value
    let wrapped = search
        
    const searched = data.titles.filter(searchFilter => searchFilter.jawSummary.title.toLowerCase() == wrapped)
    searched.map(searchFilter => {
        const ul = document.querySelector('.searches')
        const li = searchCard(searchFilter)
        ul.append(li)
    })
}

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

// Creates search results template
const searchCard =(item)=> {
    const li = document.createElement("li")
    li.className = 'search-list'
        li.innerHTML = `
        <article class="search-result">
             <div class="searchposter">
                <img src="${item.jawSummary.backgroundImage.url}" class="search-poster">
             </div>
            <div class="searchtitle">
                <p>${item.jawSummary.title}</p>
                 <div class="rating">
                    <small>
                    <i class="fa-solid fa-star"></i>
                    4.7 <span> ${item.jawSummary.genres[0].name}</span></small>
                </div>
            </div>
        </article>
        `;
     return li;   
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