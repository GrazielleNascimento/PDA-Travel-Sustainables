import { Router } from "express";
import { createGuide, getGuides, getGuideById, updateGuide, deleteGuide } from "../controllers/guide-controller.js";

const guideRouter = Router();

guideRouter.post('/create', (req, res) =>{
    const {id, name, language} = req.body;
    const guide = createGuide(id, name, language);    

    res.status(201).json(guide);
});

guideRouter.get('/getAll', (req, res) => {
    const guides = getGuides();

    res.status(200).json(guides);
});

guideRouter.get('/getById/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const guide = getGuideById(id);

    if(guide){
        res.status(200).json(guide);
    } else {
        res.status(404).json({ message: 'Guide not found' });
    }
});

guideRouter.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, language } = req.body;

    const guide = updateGuide(id, name, language);

    if(guide){
        res.status(200).json(guide);
    } else {
        res.status(404).json({ message: 'Guide not found' });
    }
});

guideRouter.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if(deleteGuide(id)){
        res.status(204).json({})
    } else {
        res.status(404).json({ message: 'Guide not found' });
    }
});

export { guideRouter };
