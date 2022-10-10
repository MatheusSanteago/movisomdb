import { aside, AsideControl, checkStorage, getMovie  } from "../scripts/scripts.js";

checkStorage();
let verifyData = () => {
  let searchTitle = document.querySelectorAll("input")[0].value;
  let searchYear = document.querySelectorAll("input")[1].value;
  if (searchTitle) {
    let data = {
      title: searchTitle,
      year: searchYear,
    };
    getMovie(data)
    searchTitle = "";
    searchYear = "";
  }
};

let btn = document.querySelector("button");
btn.addEventListener("click", verifyData);

export let fa = document.querySelectorAll("i");
let exitIcon = document.querySelector(".fa-circle-xmark");
let trashIcon = document.querySelector(".fa-trash");

  fa[0].addEventListener('click', () => {
    AsideControl(0);
  });
  exitIcon.addEventListener('click', () => {
    AsideControl(1);
  });
  trashIcon.addEventListener('click', () => {
    localStorage.removeItem('movies');
    window.location.reload(false);
  });