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
        axios.post('/api/webhooks',{
            ...formData,
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
                        className='w-full'
                    />
                </div>
                <div className=''></div>
            </form>
        </div>
    </div>
  );
}

export default App;
