import { Package } from '../models/package-model.js';
import { readFileSync, writeFileSync } from 'fs';

const packageFilePath = 'src/data/packages-data.json';

export const createPackage = (id, name, type, description, location) => {
    
    const packageTravel = new Package(id, name, type, description, location);

    const packageData = readDataFromFile();

    packageData.packages.push(packageTravel);

    saveDataToFile(packageData);
    return packageTravel;
}

export const getPackages = () => {
    const packageData = readDataFromFile();
    console.log('fetching packages successfully');
    return packageData.packages;
}

export const getPackageById = (id) => {
    const packageData = readDataFromFile();
    console.log('fetching packages successfully');
    const packageTravel = packageData.packages.find((packageTravel) => packageTravel.id === id);

    if(packageTravel){
        console.log('fetching package successfully');

        return packageTravel;
    } else {
        console.log('package not found');

        return null;
    }
}
 
export const updatePackage = (id, name, type, description, location) => {
        
        const packageData = readDataFromFile();
    
        const packageIndex = packageData.packages.findIndex((packageTravel) => packageTravel.id === id);
    
        if(packageIndex !== -1){
            packageData.packages[packageIndex] = new Package(id, name, type, description, location);
            saveDataToFile(packageData);
            console.log('updating package successfully');
            return packageData.packages[packageIndex];
        } else {
            console.log('package not found');
            return null;
        }
    }

    
export const deletePackage = (id) => {

    const packageData = readDataFromFile();

    const packageIndex = packageData.packages.findIndex((packageTravel) => packageTravel.id === id);

    if(packageIndex !== -1){
        packageData.packages.splice(packageIndex, 1);
        saveDataToFile(packageData);
        console.log('deleting package successfully');
        return true;
    } else {
        console.log('package not found');
        return false;
    }
}

const readDataFromFile = () => {
    try {
      const rawData = readFileSync(packageFilePath);
      return JSON.parse(rawData);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('Package file not found');
        return { packages: [] };
      } else {
        throw err;
      }
    }
  };
  
  
  const saveDataToFile = (data) => {
    writeFileSync((packageFilePath), JSON.stringify(data, null, 2));
    console.log('Package saved to file');
  };
