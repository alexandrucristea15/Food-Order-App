import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-app-2e0a3-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      const responesData = await response.json();

      const loadedMeals = [];

      for (const key in responesData) {
        loadedMeals.push({
          id: key,
          name: responesData[key].name,
          description: responesData[key].description,
          price: responesData[key].price,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
