// initiate express server
const express = require("express");
const app = express();


//By default, just parse the json for my use
app.use(express.json());

//pull in mongo db
const mongodb = require("./persist/mongo");
mongodb.setUpConnectionHandlers(() => {
  // console.log("hi");
  // start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
mongodb.connect();

//pull in db
// const persist = require("./persist/memory")

const Todo = require("./persist/todo")

//example of how to call addTodo function
//persist.addTodo();

// put in command line flags
const flags = require("flags");
flags.defineNumber("port", 3000, "Ports for the http servier to listen on");
flags.parse();

// put in env vars
const dotenv = require("dotenv");
const { putTodo } = require("./persist/memory.js");
const { findByIdAndDelete } = require("./persist/todo");

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
    Todo.findById(id).then((todo) => {
      if(todo == null){
        res.status(404).json({message: "not found"});
      } else {
        res.json(todo);
      }
    }).catch((err) => {
      res.status(500).json(err);
    });
});

app.get("/todos", (req, res) => {
  Todo.find().then((todo) => {
    res.json(todo);
  }).catch((err) => {
    res.status(500).json(err);
  });
  // res.json(persist.getTodos());
});

app.post("/todo", (req, res) => {
    // persist.addTodo(req);
  const vTodo = setupTodo(req.body);
  Todo.create(vTodo).then((todo) => {
    res.json(todo);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id).then((todo) => {
      if(todo == null){
        res.status(404).json({message: "not found"});
      } else {
        res.send("Id Deleted");
      }
    }).catch((err) => {
      res.status(500).json(err);
    });
  // persist.deleteTodo(id)
  // console.log(id);
  // res.send("delete todo");
});


//Bad delete that was supposed to delete all models, but didn't...
// app.delete("/todos", (req, res) => {
//   const id = req.params.id;
//   Todo.Model.remove([]).exec().then(() => {
//     res.send("Everything Deleted");
//   }).catch((err) => {
//     res.status(500).json(err);
//   });
// // persist.deleteTodo(id)
// // console.log(id);
// // res.send("delete todo");
// });

// here is data, and completely replace what I gave you
app.put("/todo/:id", (req, res) => {
  const id = req.params.id;
  // validate the data
  const vTodo = setupTodo(req.body);
  Todo.findByIdAndUpdate(id, vTodo, {returnDocument: 'after'}).then((todo) => {
    if(todo == null){
      res.status(404).json({message: "not found"});
    } else {
      res.json(todo);
    }
  }).catch((err) => {
    res.status(500).json(err);
  });
  // const todo = persist.setTodo(id, vTodo);
  // res.json(todo);
});

//Here is some date, replace what I gave you
app.patch("/todo/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, req.body, {returnDocument: 'after'}).then((todo) => {
    if(todo == null){
      res.status(404).json({message: "not found"});
    } else {
      res.json(todo);
    }
  }).catch((err) => {
    res.status(500).json(err);
  });
  // validate the data
  // this validation is done a bit different than the post and put
  // const todo = persist.patchTodo(id, req.body);
  // res.json(todo);
});

setupTodo = function (todoData) {
  let deadline = new Date();
  let done = false;
  // check deadline and make sure its good
  if (todoData.deadline) {
    deadline = new Date(todoData.deadline);
  }
  // check done and make sure its good
  if (todoData.done) {
    done = todoData.done;
  }
  // set defaults for eveything else
  return {
    name: todoData.name || "",
    description: todoData.description || "",
    done: done,
    deadline: deadline,
  };
};