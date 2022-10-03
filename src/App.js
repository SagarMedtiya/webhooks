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
    const [formData, setForData] = useState({
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
                    return (
                        
                    )
                })
            })
        }
    }
    return (
    <div></div>
  );
}

export default App;
