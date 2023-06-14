import './style.css';
import fillActivities from '../modules/fillActivities.js';
import AvailableActivities from '../modules/todoListActivities.js';

const activities = new AvailableActivities();

const storedTasks = JSON.parse(localStorage.getItem('storedTasks')) || [];
fillActivities(storedTasks);

const activityDetails = document.querySelector('#activityDetails');
const activityCheck = document.querySelector('#activityCheck');

activityCheck.addEventListener('click', () => {
  let newActivity = {};
  if (activityDetails.value === '') {
    document.querySelector('.error-message').textContent = 'Error, Description cannot be blank';
  }
  if (activityDetails.value !== '') {
    document.querySelector('.error-message').textContent = '';
    newActivity = { description: activityDetails.value };
    document.querySelectorAll('.activity-area').forEach((e) => e.remove());
    fillActivities(activities.addActivity(newActivity));
  }
  activityDetails.value = '';
});

const activitiesArea = document.querySelector('.todo-container');
activitiesArea.addEventListener('click', (e) => {
  if (e.target && e.target.matches('i.trash')) {
    const index = Number(e.target.id.replace('d', ''));
    document.querySelectorAll('.activity-area').forEach((e) => e.remove());
    fillActivities(activities.removeActivity(index));
  }

  if (e.target && e.target.matches('i.edit')) {
    const targetClassList = e.target.classList;
    document.querySelector(`p.${targetClassList[0]}`).focus();
  }
});

activitiesArea.addEventListener('input', (e) => {
  if (e.target && e.target.matches('p')) {
    const targetClassList = e.target.classList;
    activities.modifyActivity(Number(targetClassList[0].replace('d', '')));
  }
});
