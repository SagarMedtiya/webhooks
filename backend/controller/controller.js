const axios = require("axios");
var webhooks= {
    COMMIT: [],
    PUSH:[],
    MERGE:[]
}

class controller{

    async webhookss(req,res){
        const {payloadUrl, secret, eventTypes} = req.body;
        eventTypes.forEach(eventType=>{
            webhooks[eventType].push({payloadUrl: payloadUrl, secret: secret})
        })
        console.log(webhooks);
        return res.sendStatus(201);
    }
    async emulate(req,res){    
        const {type, data} = req.body;
        //business logic comes here
        
        //event trigger 
        setTimeout(async()=>{
            //Async 
            const webhookList = webhooks[type];
            console.log(webhookList);
            for(let i = 0; i<webhookList.length;i++){
                const webhook = webhookList[i];
                const {payloadUrl, secret} = webhook;
                console.log(payloadUrl);
                try{
                    await axios.post(payloadUrl, data,{
                        headers:{
                            'x-secret': secret
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