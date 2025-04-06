const form = document.getElementById('studyForm');
const board = document.getElementById('liveBoard');
let sessions = JSON.parse(localStorage.getItem('studySessions')) || [];

function displaySessions() {
  board.innerHTML = '';
  const now = Date.now();
  sessions = sessions.filter(session => session.expiresAt > now);
  localStorage.setItem('studySessions', JSON.stringify(sessions));
  sessions.forEach(session => {
    const remaining = Math.ceil((session.expiresAt - now) / 60000);
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${session.name}</strong> is studying <em>${session.task}</em> | ${remaining} min left`;
    board.appendChild(div);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const task = document.getElementById('task').value;
  const minutes = parseInt(document.getElementById('minutes').value);
  const expiresAt = Date.now() + minutes * 60000;
  sessions.push({ name, task, expiresAt });
  localStorage.setItem('studySessions', JSON.stringify(sessions));
  form.reset();
  displaySessions();
});

displaySessions();
setInterval(displaySessions, 60000);
