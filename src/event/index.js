import M from 'materialize-css/dist/js/materialize';
import eventTemplate from './event.template';
import store from '../state';

import { daysOfTheWeek, timeList } from '../constants';

export default function createEvent() {
  return {
    HTML: `
      <div class="container">
          ${eventTemplate()}
      </div>
    `,

    methods: {
      onSubmit(e) {
        e.preventDefault();

        const form = document.forms.create;
        const persons = Array.from(form.participants.options)
          .filter((option) => option.selected)
          .map((option) => option.value);

        const newEvent = {
          persons: [...persons],
          day: form.day.value,
          time: form.time.value,
          name: form.name.value,
        };

        const isBusy = store.state.some(
          (item) => item.day === newEvent.day && item.time === newEvent.time,
        );

        if (isBusy) {
          M.toast({
            html: 'Failed to create an event. Time slot is aslredy booked',
            classes: 'red lighten-1',
          });
        } else {
          const position = [
            timeList.findIndex((item) => item === newEvent.time),
            daysOfTheWeek.findIndex((item) => item === newEvent.day) + 1,
          ].join(':');

          newEvent.position = position;
          store.state.push(newEvent);
          window.location.hash = '';
        }
      },
    },

    addListeners() {
      const selects = document.querySelectorAll('select');
      M.FormSelect.init(selects);

      const form = document.querySelector('#create');
      form.addEventListener('submit', this.methods.onSubmit);
    },
  };
}
