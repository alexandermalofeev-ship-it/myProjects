const btnEl = document.querySelector('#new-customer');
btnEl.addEventListener('click', addNewCustomer);
if (JSON.parse(localStorage.getItem('customers')) === null)
  localStorage.setItem('customers', JSON.stringify([]));
renderSelect();
renderTable();

function addNewCustomer() {
  const customers = JSON.parse(localStorage.getItem('customers')) || [];
  const homeNumber = prompt('номер дома');
  const rate = prompt('показания счетчика');
  const newCustomer = new Object();
  newCustomer.homeNumber = homeNumber;
  newCustomer.rate = rate;
  customers.push(newCustomer);
  localStorage.setItem('customers', JSON.stringify(customers));
  console.log(customers);
  renderSelect();
  renderTable();
}

function renderSelect() {
  while (document.querySelector('#select').firstChild)
    document
      .querySelector('#select')
      .removeChild(document.querySelector('#select').firstChild);

  const customers = JSON.parse(localStorage.getItem('customers'));
  customers.forEach((el, index) => {
    const selectEl = document.querySelector('#select');
    const optionEl = document.createElement('option');
    optionEl.innerHTML = el.homeNumber;
    optionEl.dataset.index = index;
    selectEl.append(optionEl);
  });
}

const selectEl = document.getElementById('select');
selectEl.addEventListener('change', () => {
  const customers = JSON.parse(localStorage.getItem('customers'));
  document.querySelector('#input').value =
    customers[selectEl.options[selectEl.selectedIndex].dataset.index].rate;
});

function renderTable() {
  const customers = JSON.parse(localStorage.getItem('customers'));
  const tableBody = document.querySelector('#customer-tbody');
  tableBody.innerHTML = '';
  customers.forEach((customer, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${customer.homeNumber}</td>
    <td>${customer.rate}</td>
    `;
    row.classList.add('row');
    tableBody.appendChild(row);
  });
}

//удаление пользователя
const deleteEl = document.querySelector('.delete');
deleteEl.addEventListener('click', handleDeleteCustomer);
function handleDeleteCustomer() {
  const selectEl = document.getElementById('select');
  const customers = JSON.parse(localStorage.getItem('customers'));
  customers.splice(selectEl.options[selectEl.selectedIndex].dataset.index, 1);
  localStorage.setItem('customers', JSON.stringify(customers));
  renderSelect();
  renderTable();
}

//внесение показаний
const editEl = document.querySelector('.edit');
editEl.addEventListener('click', handleEditRate);
function handleEditRate() {
  const selectEl = document.getElementById('select');
  const customers = JSON.parse(localStorage.getItem('customers'));
  const newRate = document.querySelector('#input').value;
  customers[selectEl.options[selectEl.selectedIndex].dataset.index].rate =
    newRate;
  localStorage.setItem('customers', JSON.stringify(customers));
  renderSelect();
  renderTable();
}
