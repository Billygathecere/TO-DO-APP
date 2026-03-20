// Gets username and updates greeting
let initials = prompt("Input your name please");
let username = document.getElementById("username");
username.innerHTML = `Good Morning ${initials || 'User'}`;

// Gets the complete task number cotainer
let completestats = document.getElementById("completedstats");

// Gets the completed task list container
let completedtasks = document.getElementById("completed");

// Gets the uncompleted task list container
let activetasks = document.getElementById("active");

// Gets active stats container
let activestats = document.getElementById("activestats");

// Gets input
let input = document.getElementById("input");

// Gets the task list number container
let taskstats = document.getElementById("taskstats");

// Gets the task list container
let tasklist = document.getElementById("task");

// Stats Section

let taskno = parseInt(localStorage.getItem("taskno")) || 0;
taskstats.innerHTML = taskno;

let activeno = parseInt(localStorage.getItem("activeno")) || 0;
activestats.innerHTML = activeno;

let completedno = parseInt(localStorage.getItem("completedno")) || 0;
completestats.innerHTML = completedno;

// Function for saving a task
function savetask() {
    let taskcontainer = document.getElementById("task");
    
    if (input.value === "") {
        alert("Enter something please");
    } else {
        let list = document.createElement("li");
        // We add onclick="complete(event)" to the circle icon
        list.innerHTML = `
            <i class="fa-regular fa-circle toggle-btn" onclick="complete(event)"></i>
            <span class="task-text">${input.value}</span>
            <i class="fa-solid fa-trash delete-btn" onclick="deletetask(event)"></i>
        `;
        taskcontainer.appendChild(list);

        // Also add to active tasks automatically
        let activelist = document.createElement("li");
        activelist.innerHTML = `
            <i class="fa-regular fa-circle toggle-btn" onclick="complete(event)"></i>
            <span class="task-text">${input.value}</span>
            <i class="fa-solid fa-trash delete-btn" onclick="deletetask(event)"></i>
        `;
        activetasks.appendChild(activelist);
        activeno++;
        activestats.innerHTML = activeno;
        
        taskno++;
        taskstats.innerHTML = taskno;

        store();
        input.value = "";
    }
}

// Function for completing a task
const complete = (event) => {
    // event.target is the icon you clicked. 
    // .closest("li") finds the <li> tag that contains that icon.
    let item = event.target.closest("li");
    let text = item.querySelector(".task-text").innerText;

    completedno++;
    completestats.innerHTML = completedno;

    let completetask = document.createElement("li");
    completetask.classList.add("completed");
    completetask.innerHTML = `
        <i class="fa-solid fa-circle-check toggle-btn"></i>
        <span class="task-text">${text}</span>
        <i class="fa-solid fa-trash delete-btn" onclick="deletetask(event)"></i>
    `;
    
    completedtasks.appendChild(completetask);
    
    // Update stats if it was coming from the active container
    if (item.parentElement && item.parentElement.id === "active") {
        activeno--;
        activestats.innerHTML = activeno;
    }

    // Remove the item from its current container
    item.remove();
    store();
}

// Function for deleting a task
const deletetask = (event) => {
    let item = event.target.closest("li");
    let parentId = item.parentElement ? item.parentElement.id : null;
    
    item.remove();
    
    if (parentId === "active") {
        activeno--;
        activestats.innerHTML = activeno;
        // Also remove from the main task list if it exists there
        // Note: Simple implementation, usually you'd have a data model
    } else if (parentId === "completed") {
        completedno--;
        completestats.innerHTML = completedno;
    }

    taskno--;
    taskstats.innerHTML = taskno;
    store();
}

// Event.target.closest() method returns the closest ancestor of the element that matches the specified type.
// Event.target.closest("li") returns the closest ancestor of the element that matches the specified type.
// querySelector() method returns the first element that matches the specified type.

const store = () => {
    localStorage.setItem("tasks", tasklist.innerHTML);
    localStorage.setItem("active", activetasks.innerHTML);
    localStorage.setItem("completed", completedtasks.innerHTML);
    localStorage.setItem("activeno", activeno);
    localStorage.setItem("completedno", completedno);
    localStorage.setItem("taskno", taskno);
}

const load = () => {
   tasklist.innerHTML = localStorage.getItem("tasks") || "";
   activetasks.innerHTML = localStorage.getItem("active") || "";
   completedtasks.innerHTML = localStorage.getItem("completed") || "";
}

load();