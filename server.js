const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/konect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static('frontend'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, email, password: hashed });
    res.redirect('/login.html');
  } catch {
    res.send('Signup failed. Email may already exist.');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send('No user found.');

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.user = user;
    res.redirect('/profile.html');
  } else {
    res.send('Invalid credentials');
  }
});

app.get('/profile-data', async (req, res) => {
  if (!req.session.user) return res.status(401).send('Not logged in');
  res.send(req.session.user);
});
app.get('/', (req, res) => {
  res.send("Backend is working! Use /api/signup or /api/login")
})


app.listen(3000, () => console.log('Server running on http://localhost:3000'));