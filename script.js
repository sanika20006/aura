function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Account created!");
    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No account found!");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

window.onload = function() {
    const welcome = document.getElementById("welcome");
    const user = JSON.parse(localStorage.getItem("user"));

    if (welcome && user) {
        welcome.innerText = `Hi ${user.name}, how are you feeling today?`;
    }
};
// ---------- DAILY TASK SYSTEM ----------

// Load tasks on page load
window.addEventListener("load", function(){
    loadTasks();
    checkPendingTasks();
});

// Add new task
function addTask(){

    const input = document.getElementById("newTaskInput");
    const taskText = input.value.trim();

    if(taskText === ""){
        alert("Enter a task first");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: taskText,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
}




// Simple reminder for pending tasks
function checkPendingTasks(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let pending = tasks.filter(task => !task.completed).length;

    if(pending > 0){
        setTimeout(() => {
            alert("You have " + pending + " pending task(s). Stay consistent 💪");
        }, 8000);  // shows after 8 seconds
    }
}
// -------- MOOD INDICATOR --------

window.addEventListener("load", function(){

    const moods = JSON.parse(localStorage.getItem("moods")) || [];
    const moodIndicator = document.getElementById("moodIndicator");

    if(moods.length > 0 && moodIndicator){

        const lastMood = moods[moods.length - 1].mood;

        moodIndicator.innerText = "Today's Mood: " + lastMood;

        const moodCard = document.querySelector(".mood-card");

        const colors = {
            Happy: "#4CAF50",
            Calm: "#2196F3",
            Neutral: "#FFC107",
            Anxious: "#FF9800",
            Sad: "#F44336"
        };

        moodCard.style.border = "4px solid " + (colors[lastMood] || "#fff");
    }
});
// -------- DAILY TASKS --------

window.addEventListener("load", function(){
    loadTasks();
    updateProgress();
});

// Add task
function addTask(){

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(text === ""){
        alert("Enter a task first");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: text,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
}

// Load tasks
function loadTasks(){

    const list = document.getElementById("taskList");
    if(!list) return;

    list.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.style.marginBottom = "6px";

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})">
            ${task.text}
        `;

        list.appendChild(li);
    });

    updateProgress();
}

// Toggle completion
function toggleTask(index){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Update progress
function updateProgress(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if(tasks.length === 0){
        document.getElementById("progressBar").style.width = "0%";
        document.getElementById("progressText").innerText = "0% Completed";
        return;
    }

    let completed = tasks.filter(t => t.completed).length;
    let percent = Math.round((completed / tasks.length) * 100);

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").innerText = percent + "% Completed";
}// -------- EXPANDABLE TASK PANEL --------

function toggleTaskPanel() {
    const panel = document.getElementById("taskPanel");
    const arrow = document.getElementById("arrow");

    panel.classList.toggle("open");

    if(panel.classList.contains("open")){
        arrow.style.transform = "rotate(180deg)";
    } else {
        arrow.style.transform = "rotate(0deg)";
    }
}

window.addEventListener("load", function(){
    loadTasks();
});

function addTask(){
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(text === ""){
        alert("Enter a task");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: text, completed: false });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
}

function loadTasks(){

    const list = document.getElementById("taskList");
    if(!list) return;

    list.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = "task-item " + (task.completed ? "completed" : "pending");

        li.innerHTML = `
            <span onclick="toggleTask(${index})" style="cursor:pointer;">
                ${task.completed ? "☑" : "☐"} ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
        `;

        list.appendChild(li);
    });

    updateProgress();
}

function toggleTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function updateProgress(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    if(tasks.length === 0){
        progressBar.style.width = "0%";
        progressText.innerText = "0% Completed";
        return;
    }

    let completed = tasks.filter(t => t.completed).length;
    let percent = Math.round((completed / tasks.length) * 100);

    progressBar.style.width = percent + "%";
    progressText.innerText = percent + "% Completed";
}
// -------- BURNOUT DETECTOR --------

window.addEventListener("load", function(){
    checkBurnout();
});

function checkBurnout(){

    const moods = JSON.parse(localStorage.getItem("moods")) || [];
    const journals = JSON.parse(localStorage.getItem("journals")) || [];

    let burnout = false;

    // 1️⃣ Check low average mood (last 5)
    const last5 = moods.slice(-5);

    if(last5.length >= 3){
        let avg = last5.reduce((sum, m) => sum + m.intensity, 0) / last5.length;
        if(avg <= 2.5){
            burnout = true;
        }
    }

    // 2️⃣ Check downward trend
    if(last5.length >= 3){
        let decreasing = true;
        for(let i=1;i<last5.length;i++){
            if(last5[i].intensity >= last5[i-1].intensity){
                decreasing = false;
                break;
            }
        }
        if(decreasing){
            burnout = true;
        }
    }

    // 3️⃣ Journal stress keyword detection
    const stressWords = ["stress", "tired", "exhausted", "overwhelmed", "pressure", "burnout"];

    const recentJournal = journals.slice(-3);

    recentJournal.forEach(entry => {
        const text = entry.content.toLowerCase();
        stressWords.forEach(word => {
            if(text.includes(word)){
                burnout = true;
            }
        });
    });

    // Show alert
    const alertBox = document.getElementById("burnoutAlert");

    if(alertBox && burnout){
        alertBox.style.display = "block";
    }
}
