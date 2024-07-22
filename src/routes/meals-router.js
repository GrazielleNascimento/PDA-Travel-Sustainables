import { Router } from 'express';
import { createMeal, getAllMeals, getMealById, getMealByName, updateMeal, deleteMeal } from '../controllers/meals-controller.js';

const mealsRouter = Router();

mealsRouter.post('/create', (req, res) => {
    const { id, name, type, description, location} = req.body;
    const meal = createMeal(id, name, type, description, location);

    res.status(201).json(meal);
});

mealsRouter.get('/getAll', (req, res) => {
    const meals = getAllMeals();

    res.status(200).json(meals);
});

mealsRouter.get('/getById/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const meal = getMealById(id);

    if(meal){
        res.status(200).json(meal);
    } else {
        res.status(404).json({ message: 'Meal not found' });
    }
});

mealsRouter.get('/getByName/:name', (req, res) => {
    const name = req.params.name;
    const meal = getMealByName(name);

    if(meal){
        res.status(200).json(meal);
    } else {
        res.status(404).json({ message: 'Meal not found' });
    }
});

mealsRouter.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, type, description, location } = req.body;

    const meal = updateMeal(id, name, type, description, location);

    if(meal){
        res.status(200).json(meal);
    } else {
        res.status(404).json({ message: 'Meal not found' });
    }
});
    
mealsRouter.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if(deleteMeal(id)){
        res.status(204).json({})
    } else {
        res.status(404).json({ message: 'Meal not found' });
    }
});

export { mealsRouter }; 
