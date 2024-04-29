document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.foreach((task) => {
            addTaskToDOM(task.text);
        });
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll("#todo-list li").foreach((li) => {
            const span = li.querySelector(".task-content span").textContent;
            tasks.push({ text: span });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const addTaskToDOM = (taskText) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = taskText;

        const input = document.createElement("input");
        input.type = "text";
        input.value = taskText;

        const taskContent = document.createElement("div");
        taskContent.classList.add("task-content");
        taskContent.appendChild(span);
        taskContent.appendChild(input);

        const taskControls = document.createElement("div");
        taskControls.classList.add("task-controls");

        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.innerHTML = '<i class="fas fa-edit"></i>';

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add("delete-button");

        taskControls.appendChild(editButton);
        taskControls.appendChild(deleteButton);

        li.appendChild(taskContent);
        li.appendChild(taskControls);

        todoList.appendChild(li);

        // Event listeners for edit and delete
        editButton.addEventListener("click", () => {
            if (li.classList.contains("editing")) {
                saveEdit(li);
            } else {
                li.classList.add("editing");
                li.querySelector("input").focus();  /* Focus on the input field */
            }
        });

        deleteButton.addEventListener("click", () => {
            todoList.removeChild(li);  /* Remove task */
            saveTasks();  /* Update local storage */
        });

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                saveEdit(li);  /* Save the new task text */
            }
        });

        saveTasks();  /* Save tasks to local storage */
    };

    const saveEdit = (li) => {
        const input = li.querySelector("input");
        const span = li.querySelector("span");

        const newText = input.value.trim();
        if (newText !== "") {
            span.textContent = newText;  /* Update task text */
            li.classList.remove("editing");  /* Exit edit mode */
            saveTasks();  /* Save tasks */
        }
    };

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText !== "") {
            addTaskToDOM(taskText);  /* Add a new task */
            todoInput.value = "";  /* Clear the input field */
            saveTasks();  /* Save tasks */
        }
    });

    loadTasks();  /* Load existing tasks from local storage */
});
