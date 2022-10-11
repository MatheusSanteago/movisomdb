import { fa } from "../js/main.js";
let searched = [];
const aside = document.querySelector('aside');
const mainPage = document.querySelector('main');
const spanNav = document.querySelector('#spanError');
const searchedLoad = JSON.parse(localStorage.getItem('movies')) || [];
const colors = {
    good: 'background-color:#65CC33',
    medium: 'background-color:#FFCC33',
    bad: 'background-color:#FE0000',
    none: 'display:none;'
}

export function checkStorage() {
    searched = searchedLoad;
    if(!searchedLoad == ''){    
        searchedLoad.forEach(e => {
            createCard(e);
        });
    };
};
function createCard(data){
    aside.innerHTML += `
    <div id="card" class="cards">
        <div class="card__info">
        <h1>${data.Title}<h1>
        <h3>${data.Year}<h3>
        </div>
        <img src="${data.Poster}">
    </div>`
};
function showMovieData(data){
    mainPage.innerHTML += `
    <div class="data">
        <img src="${data.Poster}">
        <div class="data__Searched">
            <h1>${data.Title}<h1>
            <h3>Realese day: ${data.Released}<h3><br>
            <p>${data.Rated} - ${data.Runtime}</p>
            <p>Actors: ${data.Actors}</p>
            <p>Genre: ${data.Genre}</p>
            <p>Writer: ${data.Writer}</p><br>
            <p class="plot">${data.Plot}</p>
        </div>
        <div class="data__ratings">
            <p class="metascore" style="${metascoreColors(data.Metascore)}">${data.Metascore}</p>
            <p class="imdbRating">IMDb Rating<br><i class="fa-solid fa-star"></i>  ${data.imdbRating}</p>
        </div>
        <div class="data__genre">${data.Genre}</div>
        <ul>${returnRatings(data.Ratings)}<ul>
    </div>`;
    createCard(data);
};
function returnRatings(data){
    let li = '';
    data.forEach((e)=>{
        li += `<li>${e.Source} <i class="fa-solid fa-star"></i> ${e.Value}<li>`
    });
    return li;
}
export function getMovie(data){
    let url;
    if(!data.year == ''){
        console.log('Data escolhida');
        url = `http://www.omdbapi.com/?t=${data.title}&y=${data.year}&apikey=b22b6a20`;
    } else {
        url = `http://www.omdbapi.com/?t=${data.title}&apikey=b22b6a20`;
    }
    fetch(url)
    .then((res) => {
        return res.json();
    }).then((data) => {
        if(data.Response == 'False'){
            error(data.Error)
        } else {
            if(checkName(searched, data)) {
            } else {
                searched.push(data);
                showMovieData(data);
                localStorage.setItem('movies', JSON.stringify(searched));
            }
        }
    });
};
let error = (text) => {
    spanNav.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>  ' + text;
    setTimeout(()=> {
        spanNav.innerHTML = '';
    },2000);
};
function checkName(arr,res){
    let checked;
    for (let i = 0; i < arr.length; i++) {
        if(res.Title == arr[i].Title){
            error("Already searched/Search another");
            checked = true;
        }
    }
    return checked;
};
function metascoreColors(rating){
    if(rating >= 61) {
        return colors.good;
    } else if (rating >= 40) {
        return colors.medium;
    } else if (rating >= 39) {
        return colors.bad
    } else {
        return colors.none;
    }
}
export function AsideControl(req){
    if(req == 0){
        aside.style.display = 'block';
        swipAnimation(aside,"-400px","0px");
        fa[0].style.visibility = 'hidden';
        fa[1].style.visibility = 'visible';
    } else {
        swipAnimation(aside,"0px","-400px");
        setTimeout(() => {
            aside.style.display = 'none';
        },600);
        fa[0].style.visibility = 'visible';
        fa[1].style.visibility = 'hidden';
    }
}
function swipAnimation(element,start,end) {
    element.animate([
        { left: start},
        { left: end }
    ],{
        duration: 700,
        iterations: 1
    });
}