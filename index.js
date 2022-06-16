import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routers/User.js";
import stadiumRoutes from "./routers/Stadium.js";
import playerRoutes from "./routers/Player.js";
import matchRoutes from "./routers/Match.js";
import clubRoutes from "./routers/Club.js";
import standingRoutes from "./routers/Standing.js";
import parameterRoutes from './routers/Parameter.js';


import goalRoutes from "./routers/Goal.js";

import matchDetailRoutes from "./routers/MatchDetail.js";

dotenv.config();

const app = express();

const CONNECTION_URL =
  "mongodb+srv://FootballCupManager:FootballCupManager@cluster0.7hvw3.mongodb.net/footballmanager?retryWrites=true&w=majority";
const PORT = 5000;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

app.use("/user", userRoutes);
app.use("/player", playerRoutes);
app.use("/stadium", stadiumRoutes);
app.use("/match-detail", matchDetailRoutes);
app.use("/goal", goalRoutes);
app.use("/match", matchRoutes);
app.use("/club", clubRoutes);
app.use("/standing", standingRoutes);
app.use('/parameter', parameterRoutes)
