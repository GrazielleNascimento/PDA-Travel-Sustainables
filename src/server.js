import express from "express";
import { accomodationRouter } from "./routes/accomodation-router.js";

const app = express();
const port = 3000;

app.use(express.json());


app.use('/accomodation',accomodationRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
