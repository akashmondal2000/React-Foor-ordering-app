import { useEffect, useState } from "react";

const Meals = () => {
  const [loadedMeals, setloadedMeals] = useState([]);

  
  useEffect(() => {
      async function fetchMeals() {
        const responce = await fetch("http://localhost:3000/meals");
    
        if (!responce.ok) {
          //.... status code 400/500
        }
    
        const meals = await responce.json();
        setloadedMeals(meals);
    
      }
      fetchMeals()
  }, []);

  console.log(loadedMeals)
  return <ul id="meals">{
    loadedMeals.map((meal)=>(<li key={meal.id}>{meal.name}</li>))
  }</ul>;
};

export default Meals;
