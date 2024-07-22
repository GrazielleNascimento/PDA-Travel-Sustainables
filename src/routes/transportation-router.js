import { Router } from 'express';
import { createTransportation, getTransportations, getTransportationById,  getTransportationByName, getTransportationByType, updateTransportation, deleteTransportation } from '../controllers/transportation-constroller.js';

const transportationRouter = Router();

transportationRouter.post('/create', (req, res) => {
    const { id, name, type, location} = req.body;
    const transportation = createTransportation(id, name, type, location);

    res.status(201).json(transportation);
});
    
transportationRouter.get('/getAll', (res) => {
    const transportations = getTransportations();

    res.status(200).json(transportations);
});

transportationRouter.get('/getById/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const transportation = getTransportationById(id);

    if(transportation){
        res.status(200).json(transportation);
    } else {
        res.status(404).json({ message: 'Transportation not found' });
    }
});

transportationRouter.get('/getByName/:name', (req, res) => {
    const name = req.params.name;
    const transportation = getTransportationByName(name);

    if(transportation){
        res.status(200).json(transportation);
    } else {
        res.status(404).json({ message: 'Transportation not found' });
    }
});

transportationRouter.get('/getByType/:type', (req, res) => {
    const type = req.params.type;
    const transportation = getTransportationByType(type);

    if(transportation){
        res.status(200).json(transportation);
    } else {
        res.status(404).json({ message: 'Transportation not found' });
    }
});

transportationRouter.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, type, location } = req.body;

    const transportation = updateTransportation(id, name, type, location);

    if(transportation){
        res.status(200).json(transportation);
    } else {
        res.status(404).json({ message: 'Transportation not found' });
    }
});

transportationRouter.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if(deleteTransportation(id)){
        res.status(204).json({})
    } else {
        res.status(404).json({ message: 'Transportation not found' });
    }
});

export { transportationRouter };
