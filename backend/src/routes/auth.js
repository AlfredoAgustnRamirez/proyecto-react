const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let users = [];

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      role: users.length === 0 ? 'admin' : 'user'
    };
    
    users.push(newUser);
    
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;