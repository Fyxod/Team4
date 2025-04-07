
const form = document.getElementById("itemForm");
const itemsContainer = document.getElementById("itemsContainer");

function loadItems() {
  const items = JSON.parse(localStorage.getItem("marketItems")) || [];
  itemsContainer.innerHTML = "";
  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" />
      <h3>${item.title}</h3>
      <p>₹${item.price}</p>
      <p><strong>Contact:</strong> ${item.contact}</p>
      <p><em>${item.category}</em></p>
      <button class="remove-btn" data-index="${index}">Mark as Sold</button>
    `;
    itemsContainer.appendChild(card);
  });

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const items = JSON.parse(localStorage.getItem("marketItems")) || [];
      items.splice(index, 1);
      localStorage.setItem("marketItems", JSON.stringify(items));
      loadItems();
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const reader = new FileReader();
  const file = document.getElementById("image").files[0];
  reader.onloadend = () => {
    const item = {
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      contact: document.getElementById("contact").value,
      category: document.getElementById("category").value,
      image: reader.result
    };
    const items = JSON.parse(localStorage.getItem("marketItems")) || [];
    items.push(item);
    localStorage.setItem("marketItems", JSON.stringify(items));
    form.reset();
    loadItems();
  };
  if (file) {
    reader.readAsDataURL(file);
  }
});

loadItems();

