import express from "express";
import { accomodationRouter } from "./routes/accomodation-router.js";
import { placeRouter } from "./routes/place-router.js";
import { eventRouter } from "./routes/event-router.js";
import { transportationRouter } from "./routes/transportation-router.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use('/accomodation', accomodationRouter);
app.use('/place', placeRouter);
app.use('/event', eventRouter);
app.use('/transportation', transportationRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
