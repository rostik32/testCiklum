import M from 'materialize-css/dist/js/materialize';
import createTable from './table.temlate';
import createToolbar from './toolbar.template';
import createModal from './modal.template';
import store from '../state';

export default function createCalendar() {
  return {
    HTML: `
        <div class="container">
          ${createToolbar()}
          ${createTable()}
          ${createModal()}
        </div>
    `,

    modalInstance: null,

    methods: {
      tableHandler(event) {
        const { target } = event;

        if (target.closest('.app__table-delete')) {
          const cell = target.closest('TD');
          const eventName = cell.firstChild.textContent.trim();
          const { position } = cell.dataset;
          const modalContent = document.querySelector('.modal-content');
          modalContent.textContent = '';
          modalContent.insertAdjacentHTML(
            'afterbegin',
            `
            <p>Are you sure you want to delete "${eventName}" event?</p>
          `
          );
          this.modalInstance.open();

          const confirmBtn = document.querySelector('.modal-confirm');
          confirmBtn.addEventListener('click', () => {
            cell.textContent = '';
            cell.classList.remove('active');
            store.state = store.state.filter(
              (item) => item.position !== position
            );
          });
        }
      },

      onSelect() {
        const filter = this.value;

        const personIndices = store.state
          .filter((item) => item.persons.includes(filter))
          .reduce((acc, item) => {
            acc.push(item.position);
            return acc;
          }, []);

        const activeCells = document.querySelectorAll('td.active');
        activeCells.forEach((cell) => {
          const cellPosition = cell.dataset.position;

          if (filter === 'all') {
            cell.style.opacity = '1';
          } else if (!personIndices.includes(cellPosition)) {
            cell.style.opacity = '0';
          } else {
            cell.style.opacity = '1';
          }
        });
      },
    },

    addListeners() {
      const table = document.querySelector('.app__table');
      table.addEventListener('click', this.methods.tableHandler.bind(this));

      const select = document.querySelector('.app__select');
      M.FormSelect.init(select);
      select.addEventListener('change', this.methods.onSelect);

      const modal = document.querySelector('.modal');
      this.modalInstance = M.Modal.init(modal);
    },
  };
}
