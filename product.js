// Select DOM elements
const productForm = document.querySelector('#product-form');
const productNameInput = document.querySelector('#product-name');
const productPriceInput = document.querySelector('#product-price');
const productDueDateInput = document.querySelector('#product-due-date');
const productExpiryDateInput = document.querySelector('#product-expiry-date');
const productQuantityInput = document.querySelector('#product-quantity');
const productTableBody = document.querySelector('#product-table tbody');
const totalPriceCell = document.querySelector('#total-price');
const printBillButton = document.querySelector('#print-bill');

// Define products array to store added products
let products = [];

// Function to add product to table
function addProductToTable(product) {
  // Create table row and cells for product details
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  const priceCell = document.createElement('td');
  const dueDateCell = document.createElement('td');
  const expiryDateCell = document.createElement('td');
  const quantityCell = document.createElement('td');
  const subtotalCell = document.createElement('td');
  const actionCell = document.createElement('td');

  // Add product details to cells
  nameCell.textContent = product.name;
  priceCell.textContent = product.price.toFixed(2);
  dueDateCell.textContent = product.dueDate;
  expiryDateCell.textContent = product.expiryDate;
  quantityCell.textContent = product.quantity;
  subtotalCell.textContent = (product.price * product.quantity).toFixed(2);

  // Add delete button to action cell
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    // Remove product from array
    const index = products.indexOf(product);
    products.splice(index, 1);
    // Remove product from table
    row.remove();
    // Recalculate total price
    calculateTotalPrice();
  });
  actionCell.appendChild(deleteButton);

  // Add cells to row
  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(dueDateCell);
  row.appendChild(expiryDateCell);
  row.appendChild(quantityCell);
  row.appendChild(subtotalCell);
  row.appendChild(actionCell);

  // Add row to table body
  productTableBody.appendChild(row);
}

// Function to calculate total price of all products
function calculateTotalPrice() {
  let totalPrice = 0;
  products.forEach(product => {
    totalPrice += product.price * product.quantity;
  });
  totalPriceCell.textContent = totalPrice.toFixed(2);
}

// Event listener for product form submission
productForm.addEventListener('submit', event => {
  event.preventDefault();
  // Create product object from form inputs
  const product = {
    name: productNameInput.value,
    price: parseFloat(productPriceInput.value),
    dueDate: productDueDateInput.value,
    expiryDate: productExpiryDateInput.value,
    quantity: parseInt(productQuantityInput.value),
  };
  // Add product to array and table
  products.push(product);
  addProductToTable(product);
  // Reset form inputs
  productNameInput.value = '';
  productPriceInput.value = '';
  productDueDateInput.value = '';
  productExpiryDateInput.value = '';
  productQuantityInput.value = '';
  // Recalculate total price
  calculateTotalPrice();
});

// Event listener for print bill button click
printBillButton.addEventListener('click', () => {
  // Create bill string from product array
  let bill = '';
  bill += 'Name\tPrice\tDue Date\tExpiry Date\tQuantity\t
