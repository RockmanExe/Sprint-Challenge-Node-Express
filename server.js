const express= require ('express');
const actions= require('./data/helpers/actionModel');
const projects= require('./data/helpers/projectModel');
const server=express();

server.use(express.json());

server.get('/', (req,res)=> {
    res.send('Node-Express Sprint Challenge');
});

///////////////// Projects ///////////////////

server.get('/projects', (req, res)=> {
    projects.get()
    .then(project=> {
        res.json(project)
    })
    .catch(()=> {
        res.status(500).json({error:'Could not retrieve projects'})
    })
})

server.get('/projects/:id', (req, res)=>{
    const {id}= req.params;
    projects.get(id)
    .then(project=>{
        if(project===0){
            res.status(404).json({message:'Project Id not found'})
        } else {
            res.json(project)
        }
    })
    .catch(()=>{
        res.status(500).json({error:'Project Id not found'})
    })
});

server.get('/projects/actions/projectId', (req, res)=>{
    const {projectid}= req.params;
    projects.getProjectActions(projectid)
    .then(project=>{
        if(project===0){
            res.status(404).json({message:'Project Id not found'})
        } else {
            res.json(project)
        }
    })
    .catch(()=>{
        res.status(500).json({error:'Project Id not found'})
    })
});

server.post('/projects', (req, res)=> {
    const{ name, description}= req.body;
    if (!name|| !description){
        res.status(400).json({errorMessage: 'Please provide name and description'})
        return;
    }
    projects.insert({name, description})
    .then(response =>{
        res.status(201).json(response);
    })
    .catch(()=>{
        res.status(500).json({error:'Error while posting new project'})
    })
});

/////////////////// Actions ///////////////////

server.get('/actions', (req, res)=> {
    actions.get()
    .then(action=>{
        res.json(action)
    })
    .catch(()=> {
        res.status(500).json({error:'Could not retrieve actions'})
    })
})

server.get('/actions/:id', (req, res)=> {
    const {id}= req.params;
    actions.get()
    .then(actions=>{
        if (actions===0){
            res.status(404).json({message:'Action Id not found'})
        } else {
            res.json(actions)
        }
    })
    .catch(()=>{
        res.status(500).json({error:'Action with specified Id could not be retrieved'})
    })
});

server.post('/actions', (req, res)=> {
    const{ project_id, description, notes}= req.body;
    if (!project_id|| !description||notes){
        res.status(400).json({errorMessage: 'Please provide a projectId, description and some notes'})
        return;
    }
    actions.insert({project_id, description, notes})
    .then(response =>{
        res.status(201).json(response);
    })
    .catch(()=>{
        res.status(500).json({error:'Error while posting new actions'})
    })
});


server.listen(7000, () =>{
    console.log('Server is listening on Port:7000')
});