import './App.css';
import {useState} from 'react';
import axios from 'axios';


const eventsList =[
    {
        key: 'COMMIT',
        title:'Commit',
        checked: 'true',
    },
    {
        key: 'PUSH',
        title:'Push',
        checked: 'false',
    },
    {
        key: 'MERGE',
        title: 'Merge',
        checked: 'false',
    }
];

function App() {
    const [formData, setFormData] = useState({
        payloadUrl: '',
        secret: '',
        eventTypes: [...eventsList],
    });
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5600/api/webhooks',{
            ...formData ,
            eventTypes: formData.eventTypes
                .filter((item)=> !!item.checked)
                .map((item)=>item.key),
        })
    };
    const handleFormChange=(e,key)=>{
        if(e.target.name === 'eventTypes'){
            setFormData((prev)=>{
                const checkboxes = prev[e.target.name].map((item)=>{
                    return {
                        ...item,
                        checked:
                            item.key === key ? e.target.checked : item.checked,
                    };
                });
                return{
                    ...prev,
                    [e.target.name]: checkboxes,
                };
            });
            return;
        }
        setFormData((prev)=>{
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };
    const handleEventHappened =(key)=>{
        axios.post('/api/event-emulate',{
            type:key,
            data: {eventTypes:key, initiator: 'Sagar M'},
        });
    };
    return (
    <div className="App">
        <h1 className='text-3xl font-bold text-center py-4'>
            My Github (My Repo)
        </h1>
        <div className="container mx-auto">
            <h1 className='text-xl'>Register a webhook</h1>
            <form className='mt-16' onSubmit={handleSubmit}>
                <div>
                    <label className='block' htmlFor="payloadURL">Webhook URL</label>
                    <input 
                        onChange={handleFormChange} 
                        type="text" 
                        value={formData.payloadUrl}
                        id="payloadUrl"
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        name="payloadUrl"
                        
                    />
                </div>
                <div className='mt-4'>
                    <label className='secret' htmlFor="url">
                        Secret
                    </label>
                    <input 
                        type="text"
                        onChange={handleFormChange}
                        value={formData.secret}
                        name="secret"
                        id="secret"
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mt-4'>
                    <h3 className='font-bold mb-2'>Trigger Webhooks on events</h3>
                    {
                        eventsList.map((item, ind)=>{
                            return(
                                <div className="flex items-center justify-center"key={item.key}>
                                    <input
                                        onChange={e=>{
                                            handleFormChange(e,item.key)
                                        }} 
                                        defaultChecked={item.checked}
                                        value={item.checked}
                                        name="eventTypes"
                                        id={item.key}
                                        className="flex items-center"
                                        type="checkbox" />
                                    <label 
                                        className='ml-2'
                                        htmlFor={item.key}>
                                            {item.title}
                                    </label>    

                                </div>
                            );
                        })
                    }
                </div>
                <button
                    className='mt-4 bg-purple-500 text-white px-4 py-2 rounded-xl' type="submit" 
                    >Register webHook</button>
            </form>
            <div className="mt-12">
                <h1>Emulate events</h1>
                <div className=' space-x-4 content-center items-center '>
                    {eventsList.map((eventType)=>(
                        <button
                            key={eventType.key}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl"
                            onClick={()=>{
                                handleEventHappened(eventType.key)
                            }}
                        >{eventType.title}</button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
