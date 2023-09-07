const express = require("express");
const cors = require("cors");
const errorMiddleware = require("../middlewares/errorMiddleware");

const productsRouter = require("../routes/productsRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);

app.get("/health", (_req, res) => res.status(200).json({ ok: true }));

app.use(errorMiddleware);

module.exports = app;
