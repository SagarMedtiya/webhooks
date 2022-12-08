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
        return res.sendStatus(201);
    }
    async emulate(req,res){    
        const { type, data } = req.body;
        // Business logic goes here...
        console.log(req.body);
        // Event trigger (Call Webhook)
        setTimeout(async () => {
            const webhookList = webhooks[type];

            console.log(webhookList)
            for (let i = 0; i < webhookList.length; i++) {
                const webhook = webhookList[i];
                const { payloadUrl, secret } = webhook;

                try {
                    await axios.post(payloadUrl, data, {
                        headers: {
                            'x-secret': secret,
                        },
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        }, 0);

        res.sendStatus(200);
    }
    db(req,res){
        res.json(webhooks);
    }
}


module.exports = new  controller();