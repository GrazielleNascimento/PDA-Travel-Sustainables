import { Router } from 'express';
import { createAccomodation, getAccomodations, getAccomodationById, updateAccomodation, deleteAccomodation } from '../controllers/accomodation-controller.js';

const accomodationRouter = Router();

accomodationRouter.post('/create', (req, res) =>{
    const { id, name, type, location } = req.body;
    const accomodation = createAccomodation(id, name, type, location);

    res.status(201).json(accomodation);
});

accomodationRouter.get('/getAll', (req, res) => {
    const accomodations = getAccomodations();

    res.status(200).json(accomodations);
});

accomodationRouter.get('/getById/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const accomodation = getAccomodationById(id);

    //retorno no postman 
    if(accomodation){
        res.status(200).json(accomodation);
    } else {
        res.status(404).json({ message: 'Accomodation not found' });
    }
});

accomodationRouter.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, type, location } = req.body;

    const accomodation = updateAccomodation(id, name, type, location);

    //retorno no postman 
    if(accomodation){
        res.status(200).json(accomodation);
    } else {
        res.status(404).json({ message: 'Accomodation not found' });
    }
});

accomodationRouter.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    //retorno no postman 
    if(deleteAccomodation(id)){
        res.status(204)
    } else {
        res.status(404).json({ message: 'Accomodation not found' });
    }
});


export { accomodationRouter };
