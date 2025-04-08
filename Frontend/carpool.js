const form = document.getElementById("rideForm")
const rideList = document.getElementById("rideList")
const noRidesMessage = document.querySelector(".no-rides-message")

function saveRides(rides) {
  localStorage.setItem("rides", JSON.stringify(rides))
}

function getRides() {
  return JSON.parse(localStorage.getItem("rides")) || []
}

function clearAllRides() {
  localStorage.removeItem("rides")
  renderRides()
}

function renderRides() {
  rideList.innerHTML = ""
  const rides = getRides()
  
  if (rides.length === 0) {
    noRidesMessage.style.display = "block"
  } else {
    noRidesMessage.style.display = "none"
    rides.forEach(r => {
      const div = document.createElement("div")
      div.className = "card"
      div.innerHTML = `
        <h3>${r.destination}</h3>
        <p>Departure Time: ${r.departure}</p>
        <p>Contact: ${r.contact}</p>
      `
      rideList.appendChild(div)
    })
  }
}

form.addEventListener("submit", e => {
  e.preventDefault()
  const destination = document.getElementById("destination").value
  const departureTime = document.getElementById("departureTime").value
  const contact = document.getElementById("contact").value

  const ride = {
    destination,
    departure: departureTime,
    contact
  }

  const rides = getRides()
  rides.push(ride)
  saveRides(rides)
  renderRides()
  form.reset()
})


clearAllRides()
setInterval(renderRides, 60000)