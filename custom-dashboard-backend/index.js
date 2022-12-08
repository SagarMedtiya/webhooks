require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const messages = [];

const authMiddleware= (req,res,next)=>{
    
}
app.post('/git-info',(req,res)=>{
    
    const data = req.body;

    messages.push(data);
    res.sendStatus(200)
})


app.get('/',(req,res)=>{
    return res.json(messages);
     
})

app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));