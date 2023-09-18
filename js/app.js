const loadMeal = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => displayItem(data.meals))
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const displayItem = (meals) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
            <div class="card h-100">
                <img src="${
                  meal.strMealThumb
                }" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(
                      0,
                      100
                    )}...</p>
                    <button onclick="loadMealDetails(${
                      meal.idMeal
                    })" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealsDetails">
Details
</button>
                </div>
                
            </div>
            `;
    foodContainer.appendChild(mealDiv);
  });
};

const searchMeals = () => {
  const searchText = document.getElementById("search-field").value;
  console.log(searchText);
  loadMeal(searchText);
};

// const loadMealDetails = (idMeal) => {
//   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => displayMealDetails(data.meals[0]))
//     .catch((error) => {
//       console.log(error);
//     })
// };

const displayMealDetails = (meal) => {
  document.getElementById("mealsDetailsLabel").innerText = meal.strMeal;
  const mealDetails = document.getElementById("displayMealBody");
  mealDetails.innerHTML = `
     <img class="img-fluid" src="${meal.strMealThumb}" alt="" srcset="">
        <h4 class="text-black-100 text-center mt-2 "> ${meal.strMeal}</h4>
        <p class="text-black-500 text-center mt-2 ">${meal.strInstructions}</p>
  `;
};

const loadMealDetails = async (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
  } catch (error) {
    console.log("🚀 ~ file: app.js:77 ~ loadMealDetails2 ~ error:", error);
  }
};

loadMeal("fish");
