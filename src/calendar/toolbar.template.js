import { persons } from '../constants';

export default function createToolbar() {
  return `
    <header class="app__header row">
      <h3 class="app__title col s12">Calendar</h3>

      <div class="app__filter input-field col m3">
        <select class="app__select">
          <option value="all" selected>All</option>
  ${persons.map((person) => {
    const option = `<option value="${person}">${person}</option>`;
    return option;
  })}
        </select>
      </div>

      <a href="#new-event" class="waves-effect waves-light btn">
        New event
      </a>
    </header>
  `;
}
