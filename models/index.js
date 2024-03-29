if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config() 
} 

const mongoose = require('mongoose') 
mongoose.connect(process.env.MONGO_URL ,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: 'diabetes@home_db' }) 
    const db = mongoose.connection.on('error', err => { 
        console.error(err); 
        process.exit(1) 
    }) 

    db.once('open', async () => { 
        console.log(`Mongo connection started on ${db.host}:${db.port}`) 
    })

require('./patientModel')