import { Acommodation } from "../models/accomodation-model.js";
import { readFileSync, writeFileSync } from 'fs';

//arquivo de dados das acomodações
const accomodationFilePath = 'src/data/accomodations-data.json';

export const createAccomodation = (id, name, type, location) => {

    const accomodation = new Acommodation(id, name, type, location);

    // Lendo os dados do arquivo, pega o que tem dentro do arquivo e coloca na variável accomodationData
    const accomodationData = readDataFromFile();

    //acessando o arq accomodationData e adicionando(push) a nova acomodação
    accomodationData.accomodations.push(accomodation);

    //salva o arq como um CTRL + S
    saveDataToFile(accomodationData);
    return accomodation;
}


export const getAccomodations = () => {
    const accomodationData = readDataFromFile();
    console.log("fetching accomodations successfully");
    return accomodationData.accomodations;
}

export const getAccomodationById = (id) => {
    const accomodationData = readDataFromFile();
    //pega o arq, consulta a acomodacao especifica pelo id dentro do array de accomodacoes do arq accomodations-data.json
    const accomodation = accomodationData.accomodations.find((accomodation) => accomodation.id === id);

    if(accomodation){
        console.log("fetching accomodation successfully");

        return accomodation;
    }else{
        console.log("accomodation not found");
        
        return null;
    }
}

export const updateAccomodation = (id, name, type, location) => {
    const accomodationData = readDataFromFile();
    //consulta o arq da acomodação que ja existe, consulta a acomodacao especifica pelo id, dentro do array de accomodacoes do arq accomodations-data.json
    const accomodation = accomodationData.accomodations.find((accomodation) => accomodation.id === id);

    if(accomodation){
        //atualiza os valores antigos pelos novos
        accomodation.name = name;
        accomodation.type = type;
        accomodation.location = location;

        saveDataToFile(accomodationData);
        console.log("accomodation updated successfully");

        return accomodation;
    }else{
        console.log("accomodation not found");

        return null;
    }
}


export const deleteAccomodation = (id) => {
    const accomodationData = readDataFromFile();
    //consulta o arq da acomodação que ja existe, consulta a acomodacao especifica pelo id, dentro do array de accomodacoes do arq accomodations-data.json
    const accomodationIndex = accomodationData.accomodations.findIndex((accomodation) => accomodation.id === id);

    if(accomodationIndex !== -1){
        accomodationData.accomodations.splice(accomodationIndex, 1);
        saveDataToFile(accomodationData);
        console.log("accomodation deleted successfully");

        return true;
    }else{
        console.log("accomodation not found");

        return false;
    }
}

const readDataFromFile = () => {
    try {
      const rawData = readFileSync(accomodationFilePath);
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
  
  // Função para salvar dados no arquivo JSON
  const saveDataToFile = (data) => {
    writeFileSync((accomodationFilePath), JSON.stringify(data, null, 2));
    console.log('Accomodation saved to file');
  };
