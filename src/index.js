import express from 'express';
import cors from 'cors';
// import ip from 'ip';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/ping' , (req, res)=>{
    res.json({
        // ip: ip.address(),
        message: "pong",
        timestamp: new Date().toISOString()
    });   
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});