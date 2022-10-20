const webhooks= {
    COMMIT: [],
    PUSH:[],
    MERGE:[]
}

class controller{

    async webhooks(req,res){
        
        const {payloadUrl, secret, eventTypes} = req.body;
        eventTypes.forEach(eventType=>{
            webhooks[eventType].push({payloadUrl: payloadUrl, secret: secret})
        })
        return res.sendStatus(201);
    }
    emulate(req,res){
        const {type, data} = req.body;
        //business logic comes here
        
        //event trigger 
        setTimeout(()=>{
            //Async 
            
        },1000)

        res.sendStatus(200);

    }
}


module.exports = new controller();