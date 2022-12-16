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
                        </div>
                      
                    </div>
                </a>`)
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

submit.addEventListener('submit', searchMeal);


