// controllers/authController.js

exports.register = async (req, res) => {
  try {
    // Your registration logic
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    // Your login logic
    res.status(200).json({ message: 'User logged in' });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
