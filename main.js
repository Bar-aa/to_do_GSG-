function Task(description, dueDate, priority) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
}
const tasks = [];

const cin = require('readline');
const inp = cin.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addTask() {
    inp.question('Enter your task description: ', (description) => {
        inp.question('Enter your task due date(YYYY-MM-DD): ', (dueDate) => {
            inp.question('Enter your task priority (LowPriority, NonUrgent, Important,Urgent): ', (priority) => {
                const task = new Task(description, dueDate, priority);
                tasks.push(task);
                console.log('Your task added successfully to the list.');
                printMenu();
            });
        });
    });
}

function printTasks() {

    tasks.forEach((task, index) => { 
        /*const state="";
        task.completed ? state="compleated" : state="not compleated";*/
        console.log(`TASK#${index + 1}) ${task.description} -|- Due: ${task.dueDate} -|- Priority: ${task.priority} -|- Completed: ${task.completed ? 'Yes \u{1F44D}' : 'No \u{1F44E}'}`);
    });
    printMenu();
}

function listDoneTasks() {
  const completed = tasks.filter(task => task.completed);
  if (completed.length === 0) {
    console.log('you have not complete any task \u{1F622}.');
  } else {
    completed.forEach((task, index) => {
        console.log(`TASK#${index + 1}) ${task.description} -|- Due: ${task.dueDate} -|- Priority: ${task.priority} -|- Completed: ${task.completed ? 'Yes \u{1F44D}' : 'No \u{1F44E}'}`);
    });
  }
  printMenu();
}

function taskDone() {
    inp.question('Enter the index of the the task that you completed: ', (index) => {
    const task = tasks[index - 1];
    if (task) {
      task.completed = true;
      console.log('Task marked as done!');
    } else {
      console.log('Invalid task index.');
    }
    printMenu();
  });
}

function deleteTask() {
    inp.question('Enter the index of the task to delete: ', (index) => {
    const task = tasks[index - 1];
    if (task) {
      tasks.splice(index - 1, 1);
      console.log('Task deleted successfully!');
    } else {
      console.log('Invalid task index.');
    }
    printTasks();
  });
}

function sortByDueDate() {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  console.log('Tasks sorted by their due date!');
  printTasks();
}

function sortByPriority() {
  tasks.sort((a, b) => {
    const priorityOrder = {
      LowPriority: 0,
      NonUrgent: 1,
      Important: 2,
      Urgent:3
    };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  console.log('Tasks sorted by their priority');
  printTasks();
}

function clearTasks() {
    tasks.splice(0, tasks.length);
    console.log('All tasks are deleted');
    printMenu();
}

function printMenu() {

    console.log('***************************');
    console.log('Welcome to JS TODO-APP');
    console.log('***************************');
    console.log('Select an action:');
    console.log('1) Add a new task \u{2795}');
    console.log('2) List all tasks 📝');
    console.log('3) List completed tasks 📑');
    console.log('4) Mark a task as done \u{2705}');
    console.log('5) Delete a task ❌');
    console.log('6) Sort tasks by due date 📅');
    console.log('7) Sort tasks by priority 🔥');
    console.log('8) Clear all tasks 🗑️');
    console.log('9) CLOSE APP \u{1F44B}');
    console.log('***************************');
  
    inp.question("What's your choice? ", (choice) => {

        if (choice){

            if (choice == '1') {
                addTask();
            }
            else if (choice == '2') {
                printTasks();
            }
            else if (choice == '3') {
                listDoneTasks();
            }
            else if (choice == '4') {
                taskDone();
            }
            else if (choice == '5') {
                deleteTask();
            }
            else if (choice == '6') {
                sortByDueDate();
            }
            else if (choice == '7') {
                sortByPriority();
            }
            else if (choice == '8') {
                clearTasks();
            }
            else if (choice == '9') {
                console.log('Thank you for using our JS TODO-APP.');
                inp.close();
            }
            else { 
                console.log('Invalid choice. Please try again.');
                printMenu();
            }
        }
    });
}

printMenu();
