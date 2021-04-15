const express = require("express");
const app = express();
const morgan = require("morgan");

const login = require("./routes/login");
const eventos = require("./routes/eventos");
const usuarios = require("./routes/usuarios");

//settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//middlewares
app.use(morgan("combined"));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(login.verificarLogin)

//routes
app.get("/eventos/:evento", eventos.getNominadosPorEvento)
app.get("/eventos", eventos.getEventos)
app.get("/usuarios", usuarios.getUsuarios)


app.post("/login", login.postLogin)

//starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port "+app.get("port"))
})