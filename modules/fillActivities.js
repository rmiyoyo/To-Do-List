const fillActivities = (activities) => {
  const activitiesArea = document.querySelector('.todo-container');
  const activityContainer = [];
  for (let a = 0; a < activities.length; a += 1) {
    activityContainer[a] = document.createElement('div');
    activityContainer[a].classList.add('hrzntl', 'activity-area');
    for (let b = a; b < activities.length; b += 1) {
      if (activities[b].index < activities[a].index) {
        [activities[a], activities[b]] = [activities[b], activities[a]];
      }
    }
    if (activities[a].description !== '') {
      activityContainer[
        a
      ].innerHTML = `<div class = "activity-description-area hrzntl">
                                  <input class = "mark-activity" type = "checkBox">
                                  <p class = "d${activities[a].index} activity-details">${activities[a].description}</p>
                                </div>
                                <div class = "d${activities[a].index} display-periods period-container flex-column"><span class = "period"></span><span class = "period"></span><span class = "period"></span></div>
                                <i class="d${activities[a].index}  fa-regular fa-pen-to-square edit"></i>
                                <i id = "d${activities[a].index}" class="fa-regular fa-trash-can trash"></i>
                                `;
      activitiesArea.appendChild(activityContainer[a]);
    }
    document.querySelector(`.d${activities[a].index}`).contentEditable = true;
  }
};
export default fillActivities;
