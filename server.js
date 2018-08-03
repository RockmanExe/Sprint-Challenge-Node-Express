const express= require ('express');
const server=express();

server.use(express.json);

server.listen(7000,() =>{
    console.log('Server is listening on Port:7000')
});

server.get('/', (req,res)=> {
    res.send('Node-Express Sprint Challenge');
});