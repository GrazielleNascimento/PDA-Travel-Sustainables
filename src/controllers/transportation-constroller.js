import { Transportation } from '../models/transportation-model.js';
import { readFileSync, writeFileSync } from 'fs';

const transportationFilePath = 'src/data/transportations-data.json';

export const createTransportation = (id, name, location, type,)  => {
    
    const transportation = new Transportation(id, name, type, location);

    const transportationData = readDataFromFile();

    transportationData.transportations.push(transportation);

    saveDataToFile(transportationData);
    return transportation;
}

export const getTransportations = () => {
    const transportationData = readDataFromFile();
    console.log('fetching transportations successfully');
    return transportationData.transportations;
}

export const getTransportationById = (id) => {
    const transportationData = readDataFromFile();

    //acessa o arq json e procura o obj de transporte com o id passado na req
    const transportation = transportationData.transportations.find((transportation) => transportation.id === id);

    if(transportation){
        console.log('fetching transportation successfully');

        return transportation;
    } else {
        console.log('transportation not found');

        return null;
    }
}

export const getTransportationByName = (name) => {
    const transportationData = readDataFromFile();

    //acessa o arq json e procura o obj de transporte com o nome passado na req
    const transportation = transportationData.transportations.find((transportation) => transportation.name === name);   

    if(transportation){
        console.log('fetching transportation successfully');

        return transportation;
    } else {
        console.log('transportation not found');

        return null;
    }   
}
    
export const getTransportationByType = (type) => {
    const transportationData = readDataFromFile();

    //acessa o arq json e procura o obj de transporte com o tipo passado na req
    const transportation = transportationData.transportations.find((transportation) => transportation.type === type);

    if(transportation){
        console.log('fetching transportation successfully');

        return transportation;
    } else {
        console.log('transportation not found');

        return null;
    }
}

export const updateTransportation = (id, name, type, location) => {
    const transportationData = readDataFromFile();

    //No update a mesma coisa ele acessa o arq json e procura o obj de transporte com o id passado na req
    //transportations é o array de transportes
    const transportation = transportationData.transportations.find((transportation) => transportation.id === id);

    //se encontrar o obj transportation ele atualiza os dados
    if(transportation){
        //consulta o campo name e atualiza com o name passado
        transportation.name = name;
        transportation.type = type;
        transportation.location = location;

        saveDataToFile(transportationData);
        console.log('transportation updated successfully');

        return transportation;
    } else {
        console.log('transportation not found');

        return null;
    }
}

export const deleteTransportation = (id) => {
    
    const transportationData = readDataFromFile();

    //procura o obj de transporte com o id passado na req
    const index = transportationData.transportations.findIndex((transportation) => transportation.id === id);

    //se encontrar o obj transportation ele deleta
    if(index !== -1){
        transportationData.transportations.splice(index, 1);

        saveDataToFile(transportationData);
        console.log('transportation deleted successfully');

        return true;
    } else {
        console.log('transportation not found');

        return false;
    }
}

const readDataFromFile = () => {
    try {
      const rawData = readFileSync(transportationFilePath);
      return JSON.parse(rawData);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('Transportation file not found');
        return { accomodations: [] };
      } else {
        throw err;
      }
    }
  };
  
  
  const saveDataToFile = (data) => {
    writeFileSync((transportationFilePath), JSON.stringify(data, null, 2));
    console.log('Accomodation saved to file');
  };
