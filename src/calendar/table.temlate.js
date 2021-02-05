import store from '../state';
import { timeList, tHeadInfo } from '../constants';

function createTHead() {
  let tHeadRow = '';
  tHeadInfo.forEach((item) => {
    tHeadRow += `<th>${item}</th>`;
  });

  return `
    <thead>
      <tr>
        ${tHeadRow}
      </tr>
    </thead>
  `;
}

function createCell(time, rowIndex) {
  return function (_, colIndex) {
    const position = [rowIndex, colIndex].join(':');
    const cellInfo = store.state.find((item) => item.position === position);
    const cellText = cellInfo ? cellInfo.name : '';

    const cell =
      colIndex === 0
        ? `<td>${time}</td>`
        : `<td
          data-position="${position}"
          class="${cellInfo ? 'active' : ''}"
          >
            ${cellText}
            ${
              cellInfo
                ? `<button class="app__table-delete"> 
                  <span>&#10006;</span>
                </button>`
                : ''
            }
          </td>`;
    return cell;
  };
}

function createRow(time, rowIndex) {
  const cells = new Array(6).fill('').map(createCell(time, rowIndex)).join('');

  return `<tr>${cells}</tr>`;
}

function createTBody() {
  const rows = [];

  for (let i = 0; i < timeList.length; i += 1) {
    rows.push(createRow(timeList[i], i));
  }
  return `
    <tbody>
      ${rows.join('')}
    </tbody>
  `;
}

export default function createTable() {
  const tHead = createTHead();
  const tBody = createTBody();

  return `
  <table class="centered app__table">
    ${tHead}
    ${tBody}
  </table>
  `;
}
