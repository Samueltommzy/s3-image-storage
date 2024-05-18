"use strict";
import serverless from "serverless-http";
import express from "express";
import { ImageStorageHandler } from "./handlers/image-store/image-storage";
import bodyParser from "body-parser";
import { ImageRetrieveHandler } from "./handlers/image-retrieve/image-retrieve";
const app = express();

app.use(bodyParser.json());

app.post("/v1/storeimage", ImageStorageHandler);

app.get("/v1/getimage", ImageRetrieveHandler);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
