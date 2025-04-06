const form = document.getElementById("orderForm");
const ordersContainer = document.getElementById("ordersContainer");

let orders = JSON.parse(localStorage.getItem("groupOrders")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const restaurant = document.getElementById("restaurant").value;
  const waitingTime = parseInt(document.getElementById("waitingTime").value);
  const contact = document.getElementById("contact").value;

  const order = {
    id: Date.now(),
    restaurant,
    contact,
    createdAt: Date.now(),
    expiresAt: Date.now() + waitingTime * 60000,
  };

  orders.push(order);
  saveOrders();
  renderOrders();
  form.reset();
});

function saveOrders() {
  localStorage.setItem("groupOrders", JSON.stringify(orders));
}

function renderOrders() {
  const now = Date.now();
  orders = orders.filter(order => order.expiresAt > now);
  saveOrders();
  ordersContainer.innerHTML = "";
  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";
    const minutesLeft = Math.ceil((order.expiresAt - now) / 60000);
    card.innerHTML = `
      <h3>${order.restaurant}</h3>
      <p>Contact: ${order.contact}</p>
      <p>⏳ Time left: ${minutesLeft} min</p>
      <button class="join-btn">Join Order</button>
    `;
    card.querySelector(".join-btn").addEventListener("click", () => {
      alert(`Joined ${order.restaurant} group order!`);
    });
    ordersContainer.appendChild(card);
  });
}

setInterval(renderOrders, 60000);
renderOrders();

