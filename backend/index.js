const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000; 

const app = express();
app.use(cors(
    {
      origin:"*",
     methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    }
));
app.use(express.json());


const connectDB = async ()=>{
    try{
         await mongoose.connect(uri)
        .then(()=>console.log('MongoDB connected'))
        .catch((err)=>console.error(`Error: ${err.message}`));
    }catch(e){
        console.error(`Error: ${e.message}`);
    }
}
connectDB();

// User schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', UserSchema);

// Register API
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: 'User registered' });
});

// Login API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, 'your_jwt_secret');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const PropertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  description: String,
  pimage: String,
});
const Property = mongoose.model('Property', PropertySchema);

// Get all properties
app.get('/properties', async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

app.post('/properties', async (req, res) => {
  const { title, price, location, description, pimage } = req.body;
  const property = new Property({ title, price, location, description, pimage });
  await property.save();
  res.json({ message: 'Property added' });
});

app.post('/recommendations', async (req, res) => {
  const { preferences } = req.body;
  const recommendedProperties = await Property.find({ location: preferences.location });
  res.json(recommendedProperties);
});

app.listen(PORT, () => console.log('Server running on port 5000'));
app.get('/', (req, res) => {
  res.send('Hello World');
});
