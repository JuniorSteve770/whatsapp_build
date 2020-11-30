import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {Avatar} from '@material-ui/core';
import db from "../01Connects/firebase"
import AddIcon from '@material-ui/icons/Add';
import './subsideBar.css'

function SubsideBar({id, name, addNewchats}) {


// the constabove generate random id that will display different imagesfrom the api and placed inside avatar src link
// the src link is and api that insrt images inside the avatar accordind to random image fromm seed ftion
const [seed,setSeed] = useState(""); 
const [messages,setMessage] = useState(""); 

useEffect(() => {
    if(id){
        db.collection('romChats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot =>( 
            setMessage(snapshot.docs.map((doc)=>doc.data()))

        )); 
    }
    
}, [id])

useEffect(() => {
      setSeed(Math.floor(Math.random()*5000))
    }, [])

// here is the fuction to create a new chat
const createChat = () =>{
    const roomName = prompt("please enter name for chat");
    if (roomName){
        //do some kind of ....
        db.collection('romChats').add({
            name:roomName
        })
    }
}

    // below here we condition the display contain depending on addNewchart
    return !addNewchats ?  (
        <Link to = {`/romChats/${id}`}>            
            <div className="subSidebar">        
                <Avatar src ={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="subSidebar_infos">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message} </p>
                </div> 
            
            </div>
        </Link>
    ) : ( 
         <div onClick ={createChat}  className ="subSidebar">
            <h3> <AddIcon/> Create New Chats...</h3>
         </div>
        );
}

export default SubsideBar
