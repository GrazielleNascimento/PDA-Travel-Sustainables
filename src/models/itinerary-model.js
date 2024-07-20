export class Itinerary {
    constructor(id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID){ 
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.placeID = placeID;
        this.accomodationID = accomodationID;
        this.transportationID = transportationID;
        this.mealID = mealID;
        this.eventID = eventID;
        this.guideID = guideID;
        this.packageID = packageID;
    }
}
