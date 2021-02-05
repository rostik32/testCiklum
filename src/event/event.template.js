const persons = ['Maria', 'Rostik', 'Daria', 'Vladislav'];
const daysOfTheWeek = ['Monday', 'Tuesday', 'Wedneday', 'Thurday', 'Friday'];
const timeList = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

export default function eventTemplate() {
  return `
    <div class="row">
      <form id="create" name="create" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="eventName" type="text" name="name" required> 
            <label for="eventName">Name of the event</label>
          </div>

          <div class="input-field col s12">
            <select multiple name="participants" required>
  ${persons.map((person) => {
    const option = `<option value="${person}">${person}</option>`;
    return option;
  })}
            </select>
            <label>Participants</label>
          </div>

          <div class="input-field col s12">
            <select name="day">
  ${daysOfTheWeek.map((day) => {
    const option = `<option value="${day}">${day}</option>`;
    return option;
  })}
            </select>
            <label>Day</label>
          </div>

          <div class="input-field col s12">
            <select name="time" require>
  ${timeList.map((time) => {
    const option = `<option value="${time}">${time}</option>`;
    return option;
  })}
            </select>
            <label>Time</label>
          </div>
        </div>

        <a href="#" class="btn grey grey lighten-1" type="button">Cancel</a>
        <button class="btn" type="submit">Create</button>
      </form>
    </div>
  `;
}
