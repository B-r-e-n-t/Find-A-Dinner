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


const favoritesList = document.getElementById('favorites-list');
let favorites = [];

function addFavorite(title) {
    if (!favorites.includes(title)) {
        favorites.push(title);
        updateFavoritesUI();
    }
}

function updateFavoritesUI() {
    favoritesList.innerHTML = favorites.map(title => `<li>${title} <button class="delete-favorites">X</button> </li>`).join('');
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
}

favoritesList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-favorites')) {
        const itemToDelete = e.target.closest('li').textContent.trim();
        deleteFavorite(itemToDelete);
    }
});


////////////////////////////////////////////////////////




submit.addEventListener('submit', searchMeal);



