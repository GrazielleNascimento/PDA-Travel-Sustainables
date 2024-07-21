import {Event} from '../models/event-model.js';
import {readFileSync, writeFileSync} from 'fs';


const eventFilePath = 'src/data/events-data.json';

export const createEvent = (id, name, type, description, location) => { 

    const event = new Event(id, name, type, description, location);

    const eventData = readDataFromFile();

    eventData.events.push(event);

    saveDataToFile(eventData);
    return event;
}

export const getEvents = () => {
    const eventData = readDataFromFile();
    console.log('fetching events successfully');
    return eventData.events;
}

export const getEventById = (id) => {
    const eventData = readDataFromFile();
    const event = eventData.events.find((event) => event.id === id);

    if(event){
        console.log('fetching event successfully');

        return event;
    } else {
        console.log('event not found');

        return null;
    }
}

export const getEventByName = (name) => {
    const eventData = readDataFromFile();
    const event = eventData.events.find((event) => event.name === name);

    if(event){
        console.log('fetching event successfully');

        return event;
    } else {
        console.log('event not found');

        return null;
    }
}

export const updateEvent = (id, name, type, description, location) => {
    const eventData = readDataFromFile();
    const event = eventData.events.find((event) => event.id === id);

    if(event){
        event.name = name;
        event.type = type;
        event.description = description;
        event.location = location;

        saveDataToFile(eventData);
        console.log('event updated successfully');

        return event;
    } else {
        console.log('event not found');

        return null;
    }
}

export const deleteEvent = (id) => {
    const eventData = readDataFromFile();
    const index = eventData.events.findIndex((event) => event.id === id);

    if(index !== -1){
        eventData.events.splice(index, 1);
        saveDataToFile(eventData);
        console.log('event deleted successfully');

        return true;
    } else {
        console.log('event not found');

        return false;
    }
}

const readDataFromFile = () => {
    try {
      const rawData = readFileSync(eventFilePath);
      return JSON.parse(rawData);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('Events file not found');
        return { accomodations: [] };
      } else {
        throw err;
      }
    }
  };
  
  
  const saveDataToFile = (data) => {
    writeFileSync((eventFilePath), JSON.stringify(data, null, 2));
    console.log('Event saved to file');
  };
