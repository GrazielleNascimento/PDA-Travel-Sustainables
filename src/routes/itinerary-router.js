import { Router } from 'express';
import { createItinerary, getItineraries, getItineraryById, updateItinerary, deleteItinerary } from '../controllers/itinerary-controller.js';

const itineraryRouter = Router();

itineraryRouter.post('/create', (req, res) => {
    const {id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID} = req.body;
    const itinerary = createItinerary(id, name,  description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID);

    res.status(201).json(itinerary);
});

itineraryRouter.get('/getAll', (req, res) => {
    const itineraries = getItineraries();

    res.status(200).json(itineraries);
});

itineraryRouter.get('/getById/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itinerary = getItineraryById(id);

    if(itinerary){
        res.status(200).json(itinerary);
    } else {
        res.status(404).json({ message: 'Itinerary not found' });
    }
});

itineraryRouter.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name,  description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID  } = req.body;

    const itinerary = updateItinerary(id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID);

    if(itinerary){
        res.status(200).json(itinerary);
    } else {
        res.status(404).json({ message: 'Itinerary not found' });
    }
});

itineraryRouter.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if(deleteItinerary(id)){
        res.status(204).json({})
    } else {
        res.status(404).json({ message: 'Itinerary not found' });
    }
});

export { itineraryRouter };
