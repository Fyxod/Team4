
const currentUser = localStorage.getItem('marketUser') || prompt("Enter your username:");
localStorage.setItem('marketUser', currentUser);

const form = document.getElementById('itemForm');
const itemsContainer = document.getElementById('itemsContainer');
let items = JSON.parse(localStorage.getItem('marketItems')) || [];


localStorage.setItem('marketUser', currentUser);

renderItems();

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const price = document.getElementById('price').value;
  const contact = document.getElementById('contact').value;
  const category = document.getElementById('category').value;
  const imageFile = document.getElementById('image').files[0];
  const image = await toBase64(imageFile);

  const item = {
    id: Date.now(),
    owner: currentUser, 
    title,
    price,
    contact,
    category,
    image
  };

  items.push(item);
  localStorage.setItem('marketItems', JSON.stringify(items));
  renderItems();
  form.reset();
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderItems() {
  itemsContainer.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p class="price">₹${item.price}</p>
      <p>📞 ${item.contact}</p>
      <p>📂 ${item.category}</p>
      ${item.owner === currentUser
        ? `<button class="btn" onclick="markAsSold(${item.id})">Mark as Sold</button>`
        : `<p style="color: gray; font-size: 0.9em;">Posted by ${item.owner}</p>`
      }
    `;
    itemsContainer.appendChild(card);
  });
}

function markAsSold(id) {
  items = items.filter(item => item.id !== id);
  localStorage.setItem('marketItems', JSON.stringify(items));
  renderItems();
}
