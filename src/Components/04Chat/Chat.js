import React from 'react';
import {useParams} from 'react-router-dom';
import db from "../01Connects/firebase";
import firebase from "firebase";
import { useEffect, useState} from 'react';
import { useStateValue } from '../01Connects/StateProvider';
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoodIcon from '@material-ui/icons/Mood';
import MicNoneIcon from '@material-ui/icons/MicNone';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SendIcon from '@material-ui/icons/Send';
import './Chat.css';

function Chat() {
    // here we create the state that will keep track of whats typed inside input 
    const [input, setInput]=useState("");
    // const [input, setinput]=useState("");

   // End of the state

    // the constabove generate random id that will display different imagesfrom the api and placed inside avatar src link
// the src link is and api that insrt images inside the avatar accordind to random image fromm seed ftion
const [seed,setSeed] = useState(''); 
const {roomId} = useParams();
const [roomName, setroomName] = useState("");
const [messages, setMessages] = useState([]);
const [{user}, dispatch] = useStateValue();

useEffect(() => {
    // setSeed(Math.floor(Math.random()*5000))
    if(roomId){
        db.collection('romChats')
          .doc(roomId)
          .onSnapshot((snapshot) =>setroomName
          (snapshot.data().name));

        // Here we collect/read the messages from db and display  
          db.collection('romChats')
            .doc(roomId)
            .collection("messages")
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc)=>doc.data())) 
            );

    }
  }, [roomId])


useEffect(() => {
      setSeed(Math.floor(Math.random()*5000))
    }, [roomId])

const sendMessage = (e)=>{
    e.preventDefault();
    console.log("you typed" , input)
    db.collection('romChats').doc(roomId).collection('messages').add({
        message:input,
        name:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),


    });

    // the instruction below is to clear the input after we typed a contain
    setInput("");
    }
    return (
        <div className ="chatt">
{/* Here is the Header */}
           <div className ="chatts_Header">
                <Avatar src ={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                        <div className = "chat_Header_Infos">
                            <h3>{roomName}</h3>                       
                            <p>last seen:{""}
                            {new Date(
                                messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                            </p>
                        </div>
                        <div className = "chatt_Header_rigth">
                            <IconButton>
                                <SearchIcon/>
                            </IconButton>
                            <IconButton>
                                <AttachFileIcon/>
                            </IconButton>
                            <IconButton>
                                <ExpandMoreIcon/> 
                            </IconButton>
                         </div>
           </div>
{/* Here is the Body */}
           <div className ="chatt_Body">
               {/* <p className={`chatt_message ${true && 'chatt_receiver'}` }>  */}
           {messages.map((message) =>(
               <p className={`chatt_message ${message.name === user.displayName 
                    && 'chatt_receiver'}` }
                > 
                <span className ="chatt_name">{message.name}</span>
                    {message.message}
                    <span className ="chatt_time">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
               </p>
              

           ))}
            </div>

{/* Here is the Footer */}
            <div className ="chatt_Footer">
                <IconButton>                             
                    <MoodIcon/>
                </IconButton>
                <form>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) =>setInput(e.target.value)}
                        placeholder="type your text Here and press ENTER">
                    </input>
              
                    <button type ="submit" onClick ={sendMessage}>
                        Send      
                        <IconButton>                             
                             <SendIcon/>
                        </IconButton>
                    
                    </button>
                    <IconButton>                         
                        <AddAPhotoIcon/>
                    </IconButton>
                </form>
                <IconButton>                     
                    <MicNoneIcon/>
                </IconButton>
                    
            </div>
        </div>
    )
}

export default Chat
