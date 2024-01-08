// API FOR NEWS
const container = document.querySelector(".container");
const optionContainer = document.querySelector(".option-container");

const country = "in"  // in for india.

const option = ["General", "Entertaiment"," Health", "Science", "Sports", "Technology"];

let requestURL;

// CARD CREATION FOR DATA

const generateUI =(articles) =>{
    for (let item of articles){
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div class ="news-image-container"> <img src ="${item.urlToImage || "./newspaper.jpg"}"alt =""/> </div>
        <div class = "news-content"> 
            <div class = "news-title">
                ${item.title}
            </div>
            <div class = "news-description">
                ${item.description || item.content || ""}
            </div>
            <a href ="${item.url}" target = "_blank" class= "view-button">Read More</a>
        </div>`;
        container.appendChild(card)
    }
}
// news api call 

const getNews = async()=> {
    container.innerHTML= "";
    let response = await fetch(requestURL);
    if (!response.ok){
        alert ("Data unavailable at the moment.please try again later");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
};

// category 

const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element)=>{
        element.classList.remove("active");
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();

};

// options:

const createOptions = ()=>{
    for (let i of option){
        optionContainer.innerHTML += `<button class="option ${i=="General" ? "active" :""}" onclick="selectCategory(event, '${i}')">${i}</button>`;
    }
};


const init = () => {
    optionContainer.innerHTML = "";
    getNews();
    createOptions();
  };
  window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
  };
