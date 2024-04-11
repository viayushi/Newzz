const API_KEY = "a5326c57deae42f3aedb2eae210eb827";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("India"));


function reload(){           // logo pe click kar k reload k liye
    window.location.reload();
}

async function fetchNews(query) { //api call kar k data fetch karne k liye
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    bindData(data.articles);
 } //function to bind data
 
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML='';

    articles.forEach(article =>{

        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);

        cardsContainer.appendChild(cardClone);
        });
    }

    function fillDataInCard(cardClone,article){

        const newsImg = cardClone.querySelector('#news-img');
        const newsTitle = cardClone.querySelector('#news-title');
        const newsSource = cardClone.querySelector('#news-source');
        const newsDesc = cardClone.querySelector('#news-desc');

        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone: "Asia/jakarta"
        });

        newsSource.innerHTML = `${article.source.name} . ${date}`;

        cardClone.firstElementChild.addEventListener("click", ()=>{
            window.open(article.url, "_blank");
        });
    }
    let curSelectedNav = null;
    function onNavItemClick(id){
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove('active');
        curSelectedNav = navItem;
        curSelectedNav.classList.add('active');
    }
    const button = document.getElementById('sbutton');
    const text = document.getElementById('stext');

    button.addEventListener('click', ()=>{
        const query = text.value;
        if(!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove('active');
        curSelectedNav=null;
    })
