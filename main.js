document.addEventListener('DOMContentLoaded', displaySavedNotes);

document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const customerName = document.getElementById('customerName').value;
    const amountPaid = document.getElementById('amountPaid').value;
    const amountLeft = document.getElementById('amountLeft').value;

    const customer = {
        name: customerName,
        paid: amountPaid,
        left: amountLeft
    };

    saveToLocalStorage(customer);
    displaySavedNotes();
    document.getElementById('customerForm').reset();
});

function saveToLocalStorage(customer) {
    let customers;
    if(localStorage.getItem('customers') === null) {
        customers = [];
    } else {
        customers = JSON.parse(localStorage.getItem('customers'));
    }

    customers.push(customer);
    localStorage.setItem('customers', JSON.stringify(customers));
}

function displaySavedNotes() {
    const notesDiv = document.getElementById('notes');
    notesDiv.innerHTML = ''; // Clear existing notes

    let customers;
    if(localStorage.getItem('customers') === null) {
        customers = [];
    } else {
        customers = JSON.parse(localStorage.getItem('customers'));
    }

    customers.forEach((customer, index) => {
        const note = document.createElement('div');
        note.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');
        note.innerHTML = `
            <div class="note">
                <h3>Note ${index + 1}</h3>
                <p><strong>Customer Name:</strong> ${customer.name}</p>
                <p><strong>Amount Paid:</strong> ₹${customer.paid}</p>
                <p><strong>Amount Left:</strong> ₹${customer.left}</p>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        notesDiv.appendChild(note);
    });
}

function deleteNote(index) {
    let customers = JSON.parse(localStorage.getItem('customers'));

    customers.splice(index, 1);
    localStorage.setItem('customers', JSON.stringify(customers));

    displaySavedNotes();
}
