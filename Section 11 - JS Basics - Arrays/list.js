const todos = ["Buy car"];
let input = prompt("Whatcha wanna do?");

while (input !== "quit") {
  if (input === "list") {
    listTodos();
  } else if (input === "new") {
    addTodos();
  } else if (input === "delete") {
    deleteTodos();
  }

  input = prompt("Whatcha wanna do?");
}

console.log("quit appp");

function listTodos() {
  console.log("*******");
  todos.forEach((x, i) => console.log(`${i} : ${x}`));
  console.log("*******");
}

function addTodos() {
  let newTodo = prompt("Enter new todo");
  todos.push(newTodo);
  console.log("added todo");
}
function deleteTodos() {
  let delPrompt = prompt("Index to be deleted");

  todos.splice(delPrompt, 1);
  console.log("removed todo");
}
