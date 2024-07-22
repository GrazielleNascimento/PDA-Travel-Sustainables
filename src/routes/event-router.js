import { Router } from 'express';
import { createEvent, getEvents, getEventById, getEventByName, updateEvent, deleteEvent } from '../controllers/event-controller.js';

const eventRouter = Router();

eventRouter.post('/create', (req, res) => {
    const { id, name, date, description, location } = req.body;
    const event = createEvent(id, name, date, description, location);

    res.status(201).json(event);
});


eventRouter.get('/getAll', (res) => {
    const events = getEvents();

    res.status(200).json(events);
});

eventRouter.get('/getById/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const event = getEventById(id);

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});


eventRouter.get('/getByName/:name', (req, res) => {
    const name = req.params.name;
    const event = getEventByName(name);

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});


eventRouter.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, date, description, location } = req.body;

    const event = updateEvent(id, name, date, description, location);

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

eventRouter.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (deleteEvent(id)) {
        res.status(204).json({})
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});
    
export { eventRouter };
