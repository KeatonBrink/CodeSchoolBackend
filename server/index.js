const express = require("express");
const app = express();

app.get("/todo", (req, res) => {
    res.send("<h1>Todo List </h1>");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})