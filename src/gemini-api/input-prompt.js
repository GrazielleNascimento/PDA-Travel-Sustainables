import { Router } from "express";
import  GeminiApi from "../gemini-api/gemini-api.js";
import { getPlaceById } from "../controllers/place-controller.js";
import { getAccomodationById } from "../controllers/accomodation-controller.js";
import { getTransportationById } from "../controllers/transportation-constroller.js";
import { getMealById } from "../controllers/meals-controller.js";
import { getEventById } from "../controllers/event-controller.js";
import { getGuideById } from "../controllers/guide-controller.js";
import { getPackageById } from "../controllers/package-controller.js";

const promptRouter = Router();

promptRouter.post('/create', async (req, res) => {
    const { prompt } = req.body;

    const { success, text, message } = await GeminiApi.run(prompt);
        if (success) {
            res.status(200).json({ response: text });
        } else {
            res.status(400).json({ error: message });
        }
  });

const createPrompt = (itinerary) => {

    const place = getPlaceById(itinerary.placeID);
    const accomodation = getAccomodationById(itinerary.accomodationID);
    const transportation = getTransportationById(itinerary.transportationID);
    const meal = getMealById(itinerary.mealID);
    const event = getEventById(itinerary.eventID);
    const guide = getGuideById(itinerary.guideID);
    const packageTravel = getPackageById(itinerary.packageID);

    const prompt = `Create a new itinerary sustainable travel with the following details: 
    the place must be ${place.name}, in a good location ${place.location} . The accomodation must be ${accomodation.name} of the type ${accomodation.type}, I want to use transportation $(transport.name),
    the meal must be ${meal.name}. I want to go to ${event.name}.
    I'd like to go with the Guide ${guide.name} with the my favorite transportation ${transportation.name}.
    The package I would like is ${packageTravel.name} which has ${packageTravel.description} 
   `;

    return prompt;
}


export { promptRouter, createPrompt };

