export default class AvailableActivities {
  constructor() {
    this.activities = JSON.parse(localStorage.getItem('savedActivities')) || [];
  }

  addActivity = (activity) => {
    if (activity.description !== '') {
      const newActivity = {
        description: activity.description,
        completed: false,
        index: this.activities.length + 1,
      };
      this.activities.push(newActivity);
      localStorage.setItem('savedActivities', JSON.stringify(this.activities));
    }
    return this.activities;
  };

  removeActivity = (activityPosition) => {
    this.activities.splice(activityPosition - 1, 1);
    for (let i = activityPosition - 1; i < this.activities.length; i += 1) {
      this.activities[i].index -= 1;
    }
    localStorage.setItem('savedActivities', JSON.stringify(this.activities));
    return this.activities;
  };

  modifyActivity = (activityPosition) => {
    const editedTask = document.querySelector(`.d${activityPosition}`).innerHTML;
    this.activities[activityPosition - 1].description = editedTask;
    localStorage.setItem('savedActivities', JSON.stringify(this.activities));
  };

  changeActivityState = (activityPosition) => {
    if(!this.activities[activityPosition - 1].completed) {
      this.activities[activityPosition - 1].completed = true;
      document.querySelector(`p.d${activityPosition}`).style.textDecoration = 'line-through';
    } else if (this.activities[activityPosition - 1].completed) {
      this.activities[activityPosition - 1].completed = false;
      document.querySelector(`p.d${activityPosition}`).style.textDecoration = 'none';
    }
    localStorage.setItem('savedActivities', JSON.stringify(this.activities));
  }

  deleteAllFinished = () => {
    this.activities = this.activities.filter((activity) => activity.completed === false);
    for (let a = 0; a < this.activities.length; a += 1) {
      this.activities[a].index = a + 1;
    }
    localStorage.setItem('savedActivities', JSON.stringify(this.activities));
    return this.activities;
  }
}
