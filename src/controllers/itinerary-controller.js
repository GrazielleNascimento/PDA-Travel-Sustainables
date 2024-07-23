import { Itinerary } from '../models/itinerary-model.js';
import { readFileSync, writeFileSync } from 'fs';
import { createPrompt }  from '../gemini-api/input-prompt.js';
import  GeminiApi from "../gemini-api/gemini-api.js";

const itineraryFilePath = 'src/data/itineraries-data.json';

const readDataFromFile = () => {
    try {
      const rawData = readFileSync(itineraryFilePath);
      return JSON.parse(rawData);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('Itinerary file not found');
        return { itineraries: [] };
      } else {
        throw err;
      }
    }
};

const saveDataToFile = (data) => {
    writeFileSync((itineraryFilePath), JSON.stringify(data, null, 2));
    console.log('Itinerary saved to file');
};


export const createItinerary = async (id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID) => {
    
    const itinerary = new Itinerary(id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID);

    const itineraryData = readDataFromFile();

    itineraryData.itineraries.push(itinerary);

    const prompt = createPrompt(itinerary);
    console.log('prompt', prompt);
    const { success, text, message } = await GeminiApi.run(prompt);

    if (success) {
        console.log('Gemini API run successfully');
        // Update the itinerary with the response text
        itinerary.geminiAI = text;
    } else {
        console.error('Gemini API returned an error:', message);
    }

    // Save updated itinerary data to file
    saveDataToFile(itineraryData);

    return itinerary;
}
    
export const getItineraries = () => {
    const itineraryData = readDataFromFile();
    console.log('fetching itineraries successfully');
    return itineraryData.itineraries;
}

export const getItineraryById = (id) => {
    const itineraryData = readDataFromFile();

    const itinerary = itineraryData.itineraries.find((itinerary) => itinerary.id === id);

    if(itinerary){
        console.log('fetching itinerary successfully');

        return itinerary;
    } else {
        console.log('itinerary not found');

        return null;
    }
}

export const updateItinerary = (id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID) => { 
    const itineraryData = readDataFromFile();
    const itineraryIndex = itineraryData.itineraries.findIndex((itinerary) => itinerary.id === id);

    if(itineraryIndex !== -1){
        itineraryData.itineraries[itineraryIndex] = new Itinerary(id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID);
        saveDataToFile(itineraryData);
        console.log('updating itinerary successfully');
        return itineraryData.itineraries[itineraryIndex];
    } else {
        console.log('itinerary not found');
        return null;
    }
}
    
export const deleteItinerary = (id) => {
    
    const itineraryData = readDataFromFile();
    const itineraryIndex = itineraryData.itineraries.findIndex((itinerary) => itinerary.id === id);

    if(itineraryIndex !== -1){
        itineraryData.itineraries.splice(itineraryIndex, 1);
        saveDataToFile(itineraryData);
        console.log('deleting itinerary successfully');
        return true;
    } else {
        console.log('itinerary not found');
        return false;
    }
}
