const express = require('express')
const app = express();

app.get('/api',(req,res) => {
    res.json({'users':['ankit', 'yadav']})
})

app.listen(5000, () => {console.log('Running on port 5000')})