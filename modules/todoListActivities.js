export default class AvailableActivities {
  constructor() {
    this.activities = JSON.parse(localStorage.getItem('storedTasks')) || [];
  }

  addActivity = (task) => {
    if (task.description !== '') {
      const newTask = {
        description: task.description,
        completed: false,
        index: this.activities.length + 1,
      };
      this.activities.push(newTask);
      localStorage.setItem('storedTasks', JSON.stringify(this.activities));
    }
    return this.activities;
  };

  removeActivity = (taskIndex) => {
    this.activities.splice(taskIndex - 1, 1);
    for (let i = taskIndex - 1; i < this.activities.length; i += 1) {
      this.activities[i].index -= 1;
    }
    localStorage.setItem('storedTasks', JSON.stringify(this.activities));
    return this.activities;
  };

  modifyActivity = (taskIndex) => {
    const editedTask = document.querySelector(`.d${taskIndex}`).innerHTML;
    this.activities[taskIndex - 1].description = editedTask;
    localStorage.setItem('storedTasks', JSON.stringify(this.activities));
  };
}
