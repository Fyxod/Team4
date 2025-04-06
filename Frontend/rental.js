const form = document.getElementById('itemForm');
const container = document.getElementById('itemsContainer');
const itemType = document.getElementById('itemType');
const rentalInput = document.getElementById('rentalPrice');

itemType.addEventListener('change', () => {
  rentalInput.style.display = itemType.value === 'Rental' ? 'block' : 'none';
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('itemName').value;
  const type = itemType.value;
  const price = document.getElementById('rentalPrice').value;
  const imageInput = document.getElementById('itemImage');
  const contact = document.getElementById('contact').value;

  const reader = new FileReader();
  reader.onload = () => {
    const imageUrl = reader.result;
    const item = {
      id: Date.now(),
      name,
      type,
      price,
      imageUrl,
      contact
    };
    const items = JSON.parse(localStorage.getItem('rentBorrowItems') || '[]');
    items.push(item);
    localStorage.setItem('rentBorrowItems', JSON.stringify(items));
    form.reset();
    rentalInput.style.display = 'none';
    displayItems();
  };
  reader.readAsDataURL(imageInput.files[0]);
});

function displayItems() {
  container.innerHTML = '';
  const items = JSON.parse(localStorage.getItem('rentBorrowItems') || '[]');
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.imageUrl}">
      <h3>${item.name}</h3>
      <p>Type: ${item.type}</p>
      ${item.type === 'Rental' ? `<p>Rent: ₹${item.price}</p>` : ''}
      <p>Contact: ${item.contact}</p>
      <button class="remove-btn" onclick="removeItem(${item.id})">Mark as Done</button>
    `;
    container.appendChild(card);
  });
}

function removeItem(id) {
  let items = JSON.parse(localStorage.getItem('rentBorrowItems') || '[]');
  items = items.filter(item => item.id !== id);
  localStorage.setItem('rentBorrowItems', JSON.stringify(items));
  displayItems();
}

displayItems();
