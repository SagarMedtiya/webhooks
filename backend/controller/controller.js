const axios = require("axios");
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
    async emulate(req,res){
        const {type, data} = req.body;
        //business logic comes here
        
        //event trigger 
        setTimeout(async()=>{
            //Async 
            const webhookList = webhooks[type];
            for(i = 0; i<webhookList.length;i++){
                const webhook = webhookList[i];
                const {payloadUrl, secret} = webhook;
                try{
                    await axios.post(payloadUrl, data,{
                        headers:{
                            "x-secret": secret
                        }
                    })
                }
                catch(err){
                    console.log(err);
                }
            }  
        },0)

        res.sendStatus(200);
    }
    db(req,res){
        res.json(webhooks);
    }
}


module.exports = new controller();