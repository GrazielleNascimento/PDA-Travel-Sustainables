import { Guide } from '../models/guide-model.js';
import { readFileSync, writeFileSync } from 'fs';

const guideFilePath = 'src/data/guides-data.json';

export const createGuide = (id, name, language) => {
        
        const guide = new Guide(id, name, language);
    
        const guideData = readDataFromFile();
    
        guideData.guides.push(guide);
    
        saveDataToFile(guideData);
        return guide;  
}

export const getGuides = () => {
    const guideData = readDataFromFile();
    console.log('fetching guides successfully');
    return guideData.guides;
}

export const getGuideById = (id) => {
    
    const guideData = readDataFromFile();
    console.log('fetching guides successfully');
    const guide = guideData.guides.find((guide) => guide.id === id);

    if(guide){
        console.log('fetching guide successfully');

        return guide;
    } else {
        console.log('guide not found');

        return null;
    }
}

export const updateGuide = (id, name, language) => {

    const guideData = readDataFromFile();
    
    const guideIndex = guideData.guides.findIndex((guide) => guide.id === id);

    if(guideIndex !== -1){
        guideData.guides[guideIndex] = new Guide(id, name, language);
        saveDataToFile(guideData);
        console.log('updating guide successfully');
        return guideData.guides[guideIndex];
    } else {
        console.log('guide not found');
        return null;
    }   
}

export const deleteGuide = (id) => {

    const guideData = readDataFromFile();
    
    const guideIndex = guideData.guides.findIndex((guide) => guide.id === id);

    if(guideIndex !== -1){
        guideData.guides.splice(guideIndex, 1);
        saveDataToFile(guideData);
        console.log('deleting guide successfully');
        return true;
    } else {
        console.log('guide not found');
        return false;
    }
}
    

const readDataFromFile = () => {
    try {
      const rawData = readFileSync(guideFilePath);
      return JSON.parse(rawData);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('Guide file not found');
        return { guides: [] };
      } else {
        throw err;
      }
    }
  };
  
  
  const saveDataToFile = (data) => {
    writeFileSync((guideFilePath), JSON.stringify(data, null, 2));
    console.log('Accomodation saved to file');
  };
