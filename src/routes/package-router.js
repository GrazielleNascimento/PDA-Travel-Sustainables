import { Router } from "express";
import{ createPackage, getPackages, getPackageById, updatePackage, deletePackage } from "../controllers/package-controller.js";

const packageRouter = Router();

packageRouter.post('/create', (req, res) =>{
    const { id, name, type, description, location} = req.body;
    const packageTravel = createPackage(id, name, type, description, location);    

    res.status(201).json(packageTravel);
});
    
packageRouter.get('/getAll', (req,res) => {
    const packages = getPackages();

    res.status(200).json(packages);
});

packageRouter.get('/getById/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const packageTravel = getPackageById(id);

    if(packageTravel){
        res.status(200).json(packageTravel);
    } else {
        res.status(404).json({ message: 'Package not found' });
    }
});

packageRouter.put('/update/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    const { name, type, description, location } = req.body;

    const packageTravel = updatePackage(id, name, type, description, location);

    if(packageTravel){
        res.status(200).json(packageTravel);
    } else {
        res.status(404).json({ message: 'Package not found' });
    }
});;

packageRouter.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if(deletePackage(id)){
        res.status(204).json({})
    } else {
        res.status(404).json({ message: 'Package not found' });
    }
});

export { packageRouter };
