import { Router } from 'express';
import { createItinerary, getItineraries, getItineraryById, updateItinerary, deleteItinerary } from '../controllers/itinerary-controller.js';

const itineraryRouter = Router();

itineraryRouter.post('/create', async (req, res) => {
    const {id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID} = req.body;
    try {
        const itinerary = await createItinerary(id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID);
        res.status(201).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: 'Error creating itinerary', error: error.message });
    }
});

itineraryRouter.get('/getAll', async (req, res) => {
    try {
        const itineraries = await getItineraries();
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching itineraries', error: error.message });
    }
});

itineraryRouter.get('/getById/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const itinerary = await getItineraryById(id);
        if(itinerary){
            res.status(200).json(itinerary);
        } else {
            res.status(404).json({ message: 'Itinerary not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching itinerary', error: error.message });
    }
});

itineraryRouter.put('/update/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID } = req.body;
    try {
        const itinerary = await updateItinerary(id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID);
        if(itinerary){
            res.status(200).json(itinerary);
        } else {
            res.status(404).json({ message: 'Itinerary not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating itinerary', error: error.message });
    }
});

itineraryRouter.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        if(await deleteItinerary(id)){
            res.status(204).json({});
        } else {
            res.status(404).json({ message: 'Itinerary not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting itinerary', error: error.message });
    }
});

export { itineraryRouter };
