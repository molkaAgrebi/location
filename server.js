const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const adminProductRoutes = require("./routes/admin/adminProductRoutes");
const authRoutes = require("./routes/authRoutes/auth");
const adminUserRoutes = require("./routes/admin/adminUserRoutes");
const adminOrderRoutes = require("./routes/admin/adminOrderRoutes");
const clientProductRoutes = require("./routes/client/clientProductRoutes");
const clientCartRoutes = require("./routes/client/clientCartRoutes");

const authenticateToken = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration du moteur de vue EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



const PORT = 3000;

// API Routes
app.use("/api/admin", adminProductRoutes);
app.use("/api", authRoutes);
app.use("/api", clientProductRoutes);
app.use("/api", clientCartRoutes);
app.use("/api/admin", adminOrderRoutes);
app.use("/api/admin", adminUserRoutes);

// Frontend Routes
app.get("/", (req, res) => {
  res.render("login"); // Page de connexion
});

app.get("/dashboard", authenticateToken, (req, res) => {
  res.render("dashboard", { user: req.user }); // Tableau de bord
});





// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/projetVente")
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
