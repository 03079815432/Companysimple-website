// Get the product form and product table elements
const productForm = document.querySelector('#product-form');
const productTable = document.querySelector('#product-table');

// Listen for the submit event on the product form
productForm.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the form fields
  const productName = document.querySelector('#product-name').value;
  const productPrice = parseFloat(document.querySelector('#product-price').value);
  const productDueDate = document.querySelector('#product-due-date').value;
  const productExpiryDate = document.querySelector('#product-expiry-date').value;
  const productQuantity = parseInt(document.querySelector('#product-quantity').value);

  // Calculate the subtotal
  const subtotal = productPrice * productQuantity;

  // Create a new table row with the product details and subtotal
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${productName}</td>
    <td>$${productPrice.toFixed(2)}</td>
    <td>${productDueDate}</td>
    <td>${productExpiryDate}</td>
    <td>${productQuantity}</td>
    <td>$${subtotal.toFixed(2)}</td>
    <td><button class="btn btn-danger delete-btn">Delete</button></td>
  `;

  // Add the new row to the table
  productTable.appendChild(newRow);

  // Update the total price in the table footer
  updateTotalPrice();

  // Clear the form fields
  productForm.reset();
});

// Listen for click events on the delete buttons
productTable.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    // Remove the row from the table
    const row = event.target.closest('tr');
    row.remove();

    // Update the total price in the table footer
    updateTotalPrice();
  }
});

// Function to update the total price in the table footer
function updateTotalPrice() {
  // Get all the subtotals from the table rows
  const subtotals = Array.from(productTable.querySelectorAll('tr'))
    .slice(1) // exclude the table header row
    .map((row) => parseFloat(row.querySelector('td:nth-child(6)').textContent.slice(1)));

  // Calculate the total price
  const totalPrice = subtotals.reduce((total, subtotal) => total + subtotal, 0);

  // Update the total price in the table footer
  document.querySelector('#total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Listen for click events on the print bill button
const printBillButton = document.querySelector('#print-bill');
printBillButton.addEventListener('click', () => {
  // Get the HTML of the product table
  const tableHtml = productTable.outerHTML;

  // Create a new window with the table HTML and print it
  const printWindow = window.open('', 'Print');
  printWindow.document.write(`
    <html>
      <head>
        <title>Product Bill</title>
      </head>
      <body>
        ${tableHtml}
      </body>
    </html>
  `);
  printWindow.print();
  printWindow.close();
});
