const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filterBtns = document.querySelectorAll(".filter-btn");
const taskCount = document.getElementById("taskCount");
const clearCompletedBtn = document.getElementById("clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// Save to local storage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Render Todos
function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li");
        if (todo.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="task-buttons">
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        todoList.appendChild(li);
    });

    const activeTasks = todos.filter(t => !t.completed).length;
    taskCount.textContent = `${activeTasks} tasks left`;

    saveTodos();
}

// Add Todo
addBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text === "") return;

    todos.push({ text, completed: false });
    todoInput.value = "";
    renderTodos();
});

// Toggle Complete
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Delete Task
function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Edit Task
function editTask(index) {
    const newText = prompt("Edit your task:", todos[index].text);
    if (newText !== null) {
        todos[index].text = newText.trim();
        renderTodos();
    }
}

// Filter Tasks
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Clear Completed
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

// Initial Render
renderTodos();