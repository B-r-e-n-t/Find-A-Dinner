const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsElement = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealElement = document.getElementById('single-meal');



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '30aaec0b4bmshb9b1c17eb7b2250p15c1a8jsndd04901c0a18',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};


function searchMeal(e) {
    e.preventDefault();

    // singleMealElement.innerHTML = '';
    const searchTerm = search.value;

    if(searchTerm.trim()) {
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${searchTerm}&diet=vegetarian&intolerances=gluten&excludeIngredients=eggs&instructionsRequired=true&maxCalories=800&number=100`, options)
	.then(response => response.json())
	.then(data => {
        results = data.results;
        console.log(results)
        if (results && results.length) {
            return mealsElement.innerHTML = results.map(meal => 
            `
                <div class="meal">
                    <img src="${meal.image}" alt="${meal.title}"/>
                    <div class="meal-info" data-mealID="${meal.id}">
                        <h3>${meal.title}</h3>
                    </div>
                </div>
            `
            )
            .join('');
        } else {
            resultHeading.innerHTML = `<h2>There are no results for '${searchTerm}'. Try again.<h2>`;
        }
    })
    .catch(() => console.log('error'));
    search.value = ''
    } 
}


function getMealInfo(mealID) {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${mealID}/information`, options)
	.then(response => response.json())
	.then(data => {
        console.log(data)
        const meal = data[0]

        addMealInfoToDom(meal)
    })
	.catch(() => console.log('error'));
}

function addMealInfoToDom(meal) {
    const ingredients = [];
}


submit.addEventListener('submit', searchMeal);

mealsElement.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
    if(item.classList) {
        return item.classList.contains('meal-info')
    } else {
        return false;
    }
    })
    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid')
        console.log(mealID)
        getMealInfo(mealID)
    }
})



// >>>>>>>>>>>  Favorites Page  <<<<<<<<<<<<<<<

const favoriteMealsEl = document.getElementById('favorite-meals');
const favoriteButton = document.getElementById('favoriteButton');




   //  favoriteMealsEl.innerHTML = `<h2>this is working<h2>`




