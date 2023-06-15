import './style.css';
import fillActivities from '../modules/fillActivities.js';
import AvailableActivities from '../modules/todoListActivities.js';

const activities = new AvailableActivities();

const savedActivities = JSON.parse(localStorage.getItem('savedActivities')) || [];
fillActivities(savedActivities);

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
  if (e.target && e.target.matches('i.bin')) {
    const index = Number(e.target.id.replace('d', ''));
    document.querySelectorAll('.activity-area').forEach((e) => e.remove());
    fillActivities(activities.removeActivity(index));
  }

  if (e.target && e.target.matches('i.modify')) {
    const holdingLst = e.target.classList;
    document.querySelector(`p.${holdingLst[0]}`).focus();
  }

  if (e.target && e.target.matches('input.mark-activity')) {
    const holdingLst = e.target.classList;
    activities.changeActivityState(Number(holdingLst[0].replace('confirmChoice', '')));
  }
});

activitiesArea.addEventListener('input', (e) => {
  if (e.target && e.target.matches('p')) {
    const holdingLst = e.target.classList;
    activities.modifyActivity(Number(holdingLst[0].replace('d', '')));
  }
});

document.querySelector('.delete-finished-activities').addEventListener('click', () => {
  activities.deleteAllFinished();
  document.querySelectorAll('.activity-area').forEach((e) => e.remove());
  fillActivities(activities.deleteAllFinished());
});