// initiate express server
const express = require("express");
const app = express();


//By default, just parse the json for my use
app.use(express.json());
//pull in db
const persist = require("./persist/index.js")

//example of how to call addTodo function
//persist.addTodo();

// put in command line flags
const flags = require("flags");
flags.defineNumber("port", 3000, "Ports for the http servier to listen on");
flags.parse();

// put in env vars
const dotenv = require("dotenv");
const { putTodo } = require("./persist/index.js");

// set up port number
const port = flags.get("port") || process.env.PORT || 3000;

// set up server paths and handlers
// app.get("/todo", (req, res) => {
//     const todo = persist.getTodo();
//   res.send("get todo");
// });

//The id can then be used
app.get("/todo/:id", (req, res) => {
    //.id comes from the url
    const id = req.params.id;
    const todo = persist.getTodo(id);
  res.send(todo);
});

app.get("/todos", (req, res) => {
    //.id comes from the url
  res.json(persist.getTodos());
});

app.post("/todo", (req, res) => {
    // persist.addTodo(req);
  console.log(req.body);
  persist.addTodo(req.body);
  res.json(req.body);
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
  persist.deleteTodo(id)
  console.log(id);
  res.send("delete todo");
});

// here is data, and completely replace what I gave you
app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.putTodo(id, req.body); 
  res.json(todo);
});

//Here is some date, replace what I gave you
app.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    console.log(`Here is the body: ${req.body}`);
    persist.patchTodo(id, req.body);
  res.send("patch todo");
});

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});