// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
          return res.status(400).send('Invalid credentials');
      }

      // Save user session
      req.session.userId = user._id;
      res.status(200).send('Login successful');
  } catch (err) {
      res.status(500).send('Error logging in');
  }
});
