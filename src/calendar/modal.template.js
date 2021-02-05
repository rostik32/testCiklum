export default function createModal() {
  return `
    <div id="deleteModal" class="modal">
      <div class="modal-content">
      </div>
      <div class="modal-footer">
        <button class="modal-close btn-flat green lighten-1">
          No
        </button>

        <button class="modal-close btn-flat modal-confirm red lighten-1">
          Yes
        </button>
      </div>
  `;
}
