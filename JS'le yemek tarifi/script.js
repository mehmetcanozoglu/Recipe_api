//Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
console.log(url);
searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else{
    fetch(url + userInp)
    .then((Response) => Response.json())
    .then((res) =>{
        let food = res.meals[0]
        // console.log(myMeal.strMealThumb);
        // console.log(myMeal.strMeal);
        // console.log(myMeal.strArea);
        // console.log(myMeal.strInstructions);
        let count = 1;
        let ingredients = [];
        for(let i in food){
            let ingredient = ""
            let measure = ""
            if(i.startsWith("strIngredient") && food[i]) {
                ingredient = food[i]
                measure = food[`strMeasure` + count]
                count += 1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        console.log(ingredients);

        result.innerHTML = `
        <img src=${food.strMealThumb}>
        <div class="details">
            <h2>${food.strMeal}</h2>
            <h4>${food.strArea}</h4>
        </div>
        <div id="ingredient-con"></div>
        <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${food.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
        `;
        let ingredientCon = document.getElementById("ingredient-con")
        let parent = document.createElement('ul')
        let recipe = document.getElementById("recipe")
        let hideRecipe = document.getElementById("hide-recipe")
        let showRecipe = document.getElementById("show-recipe")

        ingredients.forEach((i) => {
        let child = document.createElement('li')
        child.innerText = i
        parent.appendChild(child)
        ingredientCon.appendChild(parent)
        });
        hideRecipe.addEventListener('click', () =>{
            recipe.style.display = "none"
        })
        showRecipe.addEventListener('click', () =>{
            recipe.style.display = "block"
        })
    })
    .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
  }
});