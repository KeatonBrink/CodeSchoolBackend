const todo_db = {};

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

//For POST
const addTodo = function (todo) {
    id = makeid(8);
    todo.id = id;
    todo_db[todo.id] = todo;
    console.log(todo_db);
    return todo
}

const getTodo = function (id) {
    return todo_db[id];
}

const getTodos = function () {
    return todo_db;
}

const deleteTodo = function (id) {
    // todo_db.splice(id, 1);
    delete todo_db[id];
    console.log(todo_db);
}

const putTodo = function (id, todo) {
    todo[id] = todo;
    return todo
}

const patchTodo = function (id, todoData) {
    //loop over the data and set each individual item
    for (const key in todoData) {
        todo_db[id][key] = todoData[key];
      }
    console.log(todo_db);
    return todoData
}

module.exports = {
    addTodo: addTodo,
    getTodo: getTodo,
    deleteTodo: deleteTodo,
    getTodos: getTodos,
    patchTodo: patchTodo,
    putTodo: putTodo,
}