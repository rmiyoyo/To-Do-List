// import _ from "lodash";
import './style.css';

const activities = [
  {
    description: 'Create Python modules',
    accomplished: false,
    index: Date.now().toString(),
  },
  {
    description: 'Import the Haskell modules',
    accomplished: true,
    index: Date.now().toString(),
  },
  {
    description: 'Update Anaconda dependencies',
    accomplished: true,
    index: Date.now().toString(),
  },
  {
    description: 'Finish up the todo list app',
    accomplished: true,
    index: Date.now().toString(),
  },
];

const activityContainer = document.querySelector('.todolist-container');

const fillActivities = () => {
  for (let a = 0; a < activities.length; a += 1) {
    const activityBox = document.createElement('div');
    activityBox.classList.add('flex-row', 'activity-box');
    activityBox.contentEditable = true;

    for (let b = a; b < activities.length; b += 1) {
      if (Number(activities[b].index) < Number(activities[a].index)) {
        [activities[a], activities[b]] = [activities[b], activities[a]];
      }
    }

    activityBox.innerHTML = `<div class="activity-description-box flex-row"> <input class="activity-box" type="checkBox"> <p class="fresh-add">${activities[a].description}</p> </div><div class="periods flex-column"><span class="period"></span><span class="period"></span><span class="period"></span></div>`;
    activityContainer.appendChild(activityBox);
  }
};

fillActivities();
