const express = require('express');


const app = express();

app.get('/', (req, res) => res.json({
    msg: 'Welcome to the Contactkeeper API'
}));

// Define Routes

//So, you basically say here: if there is a request for the extensions on api/users, check the file of ./routes/users.js, etc. 
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

