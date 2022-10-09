let searched = [];
export function checkStorage() {
    let searchedLoad = JSON.parse(localStorage.getItem('movies')) || [];
    searched = searchedLoad;
    if(!searchedLoad == ''){    
        console.log(searchedLoad);
        searchedLoad.forEach(element => {
            createCard(element);
        });
    };
};
function createCard(data){
    let mainPage = document.querySelector("#searched");
    mainPage.innerHTML += `
    <div id="card" class="cards">
        <div class="card__info">
        <h1>${data.Title}<h1>
        <h3>${data.Year}<h3>
        </div>
        <img src="${data.Poster}">
    </div>`
};
function showMovieData(data){
    let mainPage = document.querySelector('main');
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
            <p>${data.Plot}</p>
            <div class="data__genre">${data.Genre}</div>
                <div class="data__ratings">
                    <p class="metascore" style="${metascoreColors(data.Metascore)}">${data.Metascore}</p>
                    <p class="imdbRating"> IMDb Rating  <i class="fa-solid fa-star"></i>  ${data.imdbRating}</p>
                </div>
            <ul>${returnRatings(data.Ratings)}<ul>
        </div>
    </div>`
};

function returnRatings(data){
    let li = '';
    data.forEach((e)=>{
        li += `<li>${e.Source} <i class="fa-solid fa-star"></i> ${e.Value}<li>`
    })
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
    let spanNav = document.querySelector('#spanError');
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
        return 'background-color:#65CC33'
    } else if (rating >= 40) {
        return 'background-color:#FFCC33'
    } else if (rating >= 39) {
        return 'background-color:#FE0000'
    } else {
        return 'display:none;'
    }
}