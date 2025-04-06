const form = document.getElementById("rideForm")
const rideList = document.getElementById("rideList")

function saveRides(rides) {
  localStorage.setItem("rides", JSON.stringify(rides))
}

function getRides() {
  return JSON.parse(localStorage.getItem("rides")) || []
}

function renderRides() {
  rideList.innerHTML = ""
  const now = Date.now()
  const rides = getRides().filter(r => now < r.departureMillis)
  saveRides(rides)
  rides.forEach(r => {
    const div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
      <strong>To:</strong> ${r.destination}<br>
      <strong>Leaves At:</strong> ${r.departure}<br>
      <strong>Contact:</strong> ${r.contact}
    `
    rideList.appendChild(div)
  })
}

form.addEventListener("submit", e => {
  e.preventDefault()
  const destination = document.getElementById("destination").value
  const departureTime = document.getElementById("departureTime").value
  const contact = document.getElementById("contact").value

  const now = new Date()
  const [h, m] = departureTime.split(":").map(Number)
  const departure = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m)
  const departureMillis = departure.getTime()

  const ride = {
    destination,
    departure: departureTime,
    contact,
    departureMillis
  }

  const rides = getRides()
  rides.push(ride)
  saveRides(rides)
  renderRides()
  form.reset()
})

renderRides()
setInterval(renderRides, 60000)
