// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1olxmR-rJaje5fgdiactBXMIyAYmPX6c",
  authDomain: "find-a-dinner.firebaseapp.com",
  projectId: "find-a-dinner",
  storageBucket: "find-a-dinner.appspot.com",
  messagingSenderId: "225796504192",
  appId: "1:225796504192:web:b269c6e87398db265a0465",
  measurementId: "G-ZF6S106VY6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = firebase.auth()
// const database = firebae.database()

// function register () {
//     email = document.getElementById('email').value
//     password = document.getElementById('password').value
//     full_name = document.getElementById('full_name').value
// }

// function validate_email() {

// }























const search = document.getElementById('search');
const submit = document.getElementById('submit');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');


function searchMeal(e) {
    e.preventDefault();

const renderError = function(msg) {
    resultHeading.innerHTML = `<h2>${msg}</h2>`
}
const term = search.value;

    if(term.trim()) {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${term}&number=100&addRecipeInformation=true&apiKey=1c7cee04f89940d3b7996e14eafd77a0`)
        
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search results for '${term}':<h2>`;

            if(data.results.length === 0) {
                resultHeading.innerHTML = `<p>No meals found, try again! <br> Be sure to check your spelling.<p>`
            } else {
                mealsEl.innerHTML = data.results.map(meal =>
                `<a href='${meal.sourceUrl}' class='recipe-link' target='_blank'>
                    <div class="meal">
                        <img src="${meal.image}" alt="${meal.title}" />
                        <div class="meal-info" data-mealID="${meal.id}">
                        <h3>${meal.title}</h3>
                        <button class="add-to-favorites-btn">Add to Favorites</button>
                        </div> 
                    </div>
                </a>`
                )
                .join('');
            }
        })
        .catch(err =>
        renderError(`Something went wrong`))
        search.value = '';
        
    } else {
        resultHeading.innerHTML = `<p>Please enter a search term<p>`
    }
}


///////////////////////// Adding items to favorites list



function saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}


const favoritesList = document.getElementById('favorites-list');
let favorites = [];

function addFavorite(title) {
    if (!favorites.includes(title)) {
        favorites.push(title);
        updateFavoritesUI();

        saveFavoritesToLocalStorage();
    }
}


function updateFavoritesUI() {
    favoritesList.innerHTML = favorites.map(title => 
        `<li>
            <span class="favorite-title">${title}</span>
            <button class="delete-favorites">x</button>
        </li>`
        ).join('');
}


mealsEl.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-favorites-btn')) {
        e.preventDefault(); // Prevent default action (navigation)
        e.stopPropagation(); // Stop the event from bubbling up to parent elements

        const mealInfo = e.target.closest('.meal');
        if (mealInfo) {
            const title = mealInfo.querySelector('h3').textContent;
            addFavorite(title);
        }
    }
});


////////////////////////////////////////////////////////////////////////


// Deleting the item form favorites ///////////////////////////

function deleteFavorite(itemTitle) {
    console.log("Attempting to delete:", itemTitle); // Debugging
    console.log("Favorites before deletion:", favorites); // Debugging

    favorites = favorites.filter(title => title.trim() !== itemTitle.trim());
    updateFavoritesUI();

    console.log("Favorites after deletion:", favorites); // Debugging

    saveFavoritesToLocalStorage();
}


favoritesList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-favorites')) {
        // Find the closest <li> element
        const liElement = e.target.closest('li');
        if (liElement) {
            // Retrieve the text content of the .favorite-title span within the <li>
            const itemToDelete = liElement.querySelector('.favorite-title').textContent.trim();
            deleteFavorite(itemToDelete);
        } else {
            console.error('Could not find the <li> element for the clicked delete button.');
        }
    }
});


////////////////////////////////////////////////////////




submit.addEventListener('submit', searchMeal);



