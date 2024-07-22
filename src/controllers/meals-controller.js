import { Meal } from '../models/meal-model.js';
import { readFileSync, writeFileSync } from 'fs';

const mealsFilePath = 'src/data/meals-data.json';

export const createMeal = (id, name, type) => {
        
        const meal = new Meal(id, name, type);
    
        const mealData = readDataFromFile();
    
        mealData.meals.push(meal);
    
        saveDataToFile(mealData);
        return meal;
}

export const getAllMeals = () => {
    const mealData = readDataFromFile();
    console.log('fetching meals successfully');
    return mealData.meals;
}

export const getMealById = (id) => {
    const mealData = readDataFromFile();
    const meal = mealData.meals.find((meal) => meal.id === id);

    if(meal){
        console.log('fetching meal successfully');

        return meal;
    } else {
        console.log('meal not found');

        return null;
    }
}

export const getMealByName = (name) => {
    const mealData = readDataFromFile();
    const meal = mealData.meals.find((meal) => meal.name === name);   

    if(meal){
        console.log('fetching meal successfully');

        return meal;
    } else {
        console.log('meal not found');

        return null;
    }   
}
export const getMealByType = (type) => {
    
    const mealData = readDataFromFile();

    const meal = mealData.meals.find((meal) => meal.type === type);

    if(meal){
        console.log('fetching meal successfully');

        return meal;
    } else {
        console.log('meal not found');

        return null;
    }
}

export const updateMeal = (id, name, type) => {
    const mealData = readDataFromFile();
    const meal = mealData.meals.find((meal) => meal.id === id);

    if(meal){
        meal.name = name;
        meal.type = type;

        saveDataToFile(mealData);
        return meal;
    } else {
        return null;
    }
}

 export const deleteMeal = (id) => {
    const mealData = readDataFromFile();
    const index = mealData.meals.findIndex((meal) => meal.id === id);

    if(index !== -1){
        mealData.meals.splice(index, 1);
        saveDataToFile(mealData);
        return true;
    } else {
        return false;
    }
}

const readDataFromFile = () => {
    try {
        const rawData = readFileSync(mealsFilePath);
        return JSON.parse(rawData);
   } catch(err){
     if(err.code === 'ENOENT'){
        console.log('Meals file not found');
        return { meals: [] };
     } else {
        throw err;
     }
   }
};

const saveDataToFile = (data) => {
    writeFileSync(mealsFilePath, JSON.stringify(data, null, 2));
    console.log('Meals updated successfully');
}
