const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geoCode } = require("../utils/geocode");
const { forecast } = require("../utils/forecast");
const app = express();
const port = process.env.PORT || 3001

//Paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Directorio estatico
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Main Page",
    name: "Agus Cabral",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide Address",
    });
  } else {
    geoCode(address, (error, { longitude, latitude, location } = {}) => {      
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, data) => {
        if (error) return res.send({ error });
        else return res.send({ data });
      });
    });
  }
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Agus Cabral",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Agus Cabral",
    message: "Este es el mensaje",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }
  console.log(req.query);
  res.send({ prod: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found",
    name: "Agus Cabral",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    name: "Agus Cabral",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
