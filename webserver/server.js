const Express = require("express");
const app = Express();
const path = require("path");
const map = require("../map");
const multer = require("multer")();

app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false, limit: "1024MB", parameterLimit: 1000000000 }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async function(request, response) {
    if (!map.get("dbp")) return response.render("home/index", { _process: process, package: require("../package.json") });

    return response.render("dashboard/index", { exp: require(map.get("dbp")) });
});

app.post("/access", multer.single("folder"), async function(request, response) {
    const DBP = require(request.body.location);
    if (!DBP) return response.render("error/500");
    map.set("dbp", request.body.location);

    return response.redirect("/");
});

module.exports = app;