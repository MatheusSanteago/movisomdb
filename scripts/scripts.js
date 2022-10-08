let searched = [];

export function checkStorage() {
    let searchedLoad = JSON.parse(sessionStorage.getItem('movies')) || [];
    searched = searchedLoad;
    if(!searchedLoad == ''){    
        console.log(searchedLoad);
        searchedLoad.forEach(element => {
            getData(element);
        });
    };
}

function getData(data){
    let mainPage = document.querySelector('main');
    mainPage.innerHTML += `
    <div id="card">
        <div id="card__info">
        <h1>${data.Title}<h1>
        <h3>${data.Year}<h3>
        </div>
        <img src="${data.Poster}">
    </div>`
};

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
                getData(data);
                sessionStorage.setItem('movies', JSON.stringify(searched));
            }
        }
    });
}

let error = (text) => {
    let spanNav = document.querySelector('#spanError');
    spanNav.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>  ' + text;
    setTimeout(()=> {
        spanNav.innerHTML = '';
    },2000);
}

function checkName(arr,res){
    let checked;
    for (let i = 0; i < arr.length; i++) {
        if(res.Title == arr[i].Title){
            error("Already searched/Search another");
            checked = true;
        }
    }
    return checked;
}