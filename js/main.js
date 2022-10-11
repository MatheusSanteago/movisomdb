import { AsideControl, checkStorage, getMovie  } from "../scripts/scripts.js";

export const fa = document.querySelectorAll("i");
const exitIcon = document.querySelector(".fa-circle-xmark");
const trashIcon = document.querySelector(".fa-trash");
const btn = document.querySelector("button");

checkStorage();
const verifyData = () => {
  const searchTitle = document.querySelectorAll("input")[0].value;
  const searchYear = document.querySelectorAll("input")[1].value;
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


  btn.addEventListener("click", verifyData);

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