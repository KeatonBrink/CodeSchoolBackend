const todo_db = {};
const todo_db_Dates = {};


//Antiquated function
// function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() * 
//  charactersLength));
//    }
//    return result;
// }

//For POST
const addTodo = function (todo) {
    //id = makeid(8);
    //todo.id = id;
    todo_db[todo.id] = todo;
    todo_db_Dates[todo.id] = new Date
    //console.log(todo_db);
    return todo
}

const getTodo = function (id) {
    if (todo_db[id] == undefined){
        return false
    } else {
        return todo_db[id];
        // if (todo_db_Dates[id] < Date.now() - 12000) {
        //     delete todo_db[id];
        //     delete todo_db_Dates[id];
        //     return false
        // } else {
        //     return todo_db[id];
        //     //return todo_db[id];
        // }
    }
}

const expiredTodos = function () {
    todo_db.forEach(element => {
        if (todo_db_Dates[element.id] < Date.now() - 12000) {
            delete todo_db[element.id];
            delete todo_db_Dates[element.id];
        }
    });
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
    // loop over the data and set each individual item
    for (const key in todoData) {
      todo_db[id][key] = todoData[key];
    }
  
    // Object.keys(todoData).forEach(function (key) {
    //   todo_db[id][key] = todoData[key];
    // });
  
    // pull the new data
    const todo = todo_db[id];
    return todo;
  };

setupTodo = function(tododData) {
    let deadline = new Date();
    let done = false
}

module.exports = {
    addTodo: addTodo,
    getTodo: getTodo,
    deleteTodo: deleteTodo,
    getTodos: getTodos,
    patchTodo: patchTodo,
    putTodo: putTodo,
    expiredTodos
}