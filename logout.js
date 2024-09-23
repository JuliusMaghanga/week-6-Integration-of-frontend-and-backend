// Logout Route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Error logging out');
        res.clearCookie('connect.sid');
        res.status(200).send('Logout successful');
    });
});
