import { Place } from '../models/place-model.js';
import { readFileSync, writeFileSync } from 'fs';


const placeFilePath = 'src/data/places-data.json';

export const createPlace = (id, name, type, description,  location) => {
    
    const place = new Place(id, name, type, description, location);

    const  placeData = readDataFromFile();

    placeData.places.push(place);

    saveDataToFile(placeData);
    return place;
}

export const getPlaces = () => {
    const placeData = readDataFromFile();
    console.log('fetching places successfully');
    return placeData.places;
}

export const getPlaceById = (id) => {
    const placeData = readDataFromFile();
    const place = placeData.places.find((place) => place.id === id);

    if(place){
        console.log('fetching place successfully');

        return place;
    } else {
        console.log('place not found');

        return null;
    }
}

export const getPlaceByName = (name) => {
    const placeData = readDataFromFile();
    const place = placeData.places.find((place) => place.name === name);

    if(place){
        console.log('fetching place successfully');

        return place;
    } else {
        console.log('place not found');

        return null;
    }
}

export const updatePlace = (id, name, type, description, location) => {
    const placeData = readDataFromFile();
    const place = placeData.places.find((place) => place.id === id);

    if(place){
        place.name = name;
        place.type = type;
        place.description = description;
        place.location = location;

        saveDataToFile(placeData);
        console.log('place updated successfully');

        return place;
    } else {
        console.log('place not found');

        return null;
    }
}


export const deletePlace = (id) => {
    const placeData = readDataFromFile();
    const placeIndex = placeData.places.findIndex((place) => place.id === id);

    if(placeIndex !== -1){
        placeData.places.splice(placeIndex, 1);
        saveDataToFile(placeData);
        console.log('place deleted successfully');

        return true;
    } else {
        console.log('place not found');

        return false;
    }
}

const readDataFromFile = () => {
    try {
      const rawData = readFileSync(placeFilePath);
      return JSON.parse(rawData);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('Accomodation file not found');
        return { accomodations: [] };
      } else {
        throw err;
      }
    }
  };
  
  
  const saveDataToFile = (data) => {
    writeFileSync((placeFilePath), JSON.stringify(data, null, 2));
    console.log('Accomodation saved to file');
  };
