import { checkStorage, getMovie } from "../scripts/scripts.js";

checkStorage();

let verifyData = () => {
  let searchTitle = document.querySelectorAll("input")[0].value;
  let searchYear = document.querySelectorAll("input")[1].value;
  if (searchTitle) {
    let data = {
      title: searchTitle,
      year: searchYear,
    };
    getMovie(data);
    searchTitle = "";
    searchYear = "";
  }
};

let btn = document.querySelector("button");
btn.addEventListener("click", verifyData);
