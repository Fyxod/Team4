const form = document.getElementById('gigForm')
const gigList = document.getElementById('gigList')
const storedGigs = JSON.parse(localStorage.getItem('gigs')) || []
let currentUser = ''

function renderGigs() {
  gigList.innerHTML = ''
  storedGigs.forEach((gig, index) => {
    const card = document.createElement('div')
    card.className = 'gig-card'
    card.innerHTML = `
      <strong>${gig.taskType}</strong><br>
      ${gig.description}<br>
      ₹${gig.budget}<br>
      Contact: ${gig.contact}<br>
      Posted by: ${gig.username}
    `
    if (gig.username === currentUser) {
      const btn = document.createElement('button')
      btn.textContent = 'Remove Task'
      btn.className = 'remove-btn'
      btn.onclick = () => {
        storedGigs.splice(index, 1)
        localStorage.setItem('gigs', JSON.stringify(storedGigs))
        renderGigs()
      }
      card.appendChild(btn)
    }
    gigList.appendChild(card)
  })
}

form.onsubmit = (e) => {
  e.preventDefault()
  currentUser = document.getElementById('username').value
  const gig = {
    username: currentUser,
    taskType: document.getElementById('taskType').value,
    description: document.getElementById('description').value,
    budget: document.getElementById('budget').value,
    contact: document.getElementById('contact').value
  }
  storedGigs.push(gig)
  localStorage.setItem('gigs', JSON.stringify(storedGigs))
  form.reset()
  renderGigs()
}

window.onload = () => {
  currentUser = prompt('Enter your username')
  renderGigs()
}

