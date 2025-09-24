// Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => addTaskToDOM(task.text, task.completed));

// Add task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    addTaskToDOM(text);
    tasks.push({ text: text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
  }
});

// Function to add task to DOM
function addTaskToDOM(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  // Complete toggle on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskInStorage(text, li.classList.contains("completed"));
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    removeTaskFromStorage(text);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Update task completion in local storage
function updateTaskInStorage(text, completed) {
  tasks = tasks.map((task) =>
    task.text === text ? { ...task, completed: completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from local storage
function removeTaskFromStorage(text) {
  tasks = tasks.filter((task) => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
