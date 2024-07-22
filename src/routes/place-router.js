import { Router } from "express";
import { createPlace, getPlaces, getPlaceById, getPlaceByName, updatePlace, deletePlace } from "../controllers/place-controller.js";

const placeRouter = Router();

placeRouter.post('/create', (req, res) =>{
    const { id, name, type, description, location} = req.body;
    const place = createPlace(id, name, type, description, location);    

    res.status(201).json(place);
});

placeRouter.get('/getAll', (req, res) => {
    const places = getPlaces();

    res.status(200).json(places);
});

placeRouter.get('/getById/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const place = getPlaceById(id);

    if(place){
        res.status(200).json(place);
    } else {
        res.status(404).json({ message: 'Place not found' });
    }
});

placeRouter.get('/getByName/:name', (req, res) => {
    const name = req.params.name;
    const place = getPlaceByName(name);

    if(place){
        res.status(200).json(place);
    } else {
        res.status(404).json({ message: 'Place not found' });
    }
});


placeRouter.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, type, description, location } = req.body;

    const place = updatePlace(id, name, type, description, location);

    if(place){
        res.status(200).json(place);
    } else {
        res.status(404).json({ message: 'Place not found' });
    }
});

placeRouter.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if(deletePlace(id)){
        res.status(204).json({})
    } else {
        res.status(404).json({ message: 'Place not found' });
    }
});

export { placeRouter };
