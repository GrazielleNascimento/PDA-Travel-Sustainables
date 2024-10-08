import express from "express";
import { accomodationRouter } from "./routes/accomodation-router.js";
import { placeRouter } from "./routes/place-router.js";
import { eventRouter } from "./routes/event-router.js";
import { transportationRouter } from "./routes/transportation-router.js";
import { mealsRouter } from "./routes/meals-router.js";
import { packageRouter } from "./routes/package-router.js";
import { guideRouter } from "./routes/guide-router.js";
import { itineraryRouter } from "./routes/itinerary-router.js";
import { promptRouter } from "./gemini-api/input-prompt.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());


app.use(express.json());

app.use('/accomodation', accomodationRouter);
app.use('/place', placeRouter);
app.use('/event', eventRouter);
app.use('/transportation', transportationRouter);
app.use('/meal', mealsRouter);
app.use('/package', packageRouter);
app.use('/guide', guideRouter);
app.use('/itinerary', itineraryRouter);
app.use('/prompt', promptRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
