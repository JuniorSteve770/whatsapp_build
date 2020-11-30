import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SubsideBar from '../03Subsidebar/SubsideBar'
import {Avatar, IconButton} from '@material-ui/core';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import DonutSmallOutlinedIcon from '@material-ui/icons/DonutSmallOutlined';
import FindReplaceOutlinedIcon from '@material-ui/icons/FindReplaceOutlined';
import db from "../01Connects/firebase"
import { useStateValue } from '../01Connects/StateProvider';


function SideBar() {
    // Here we map the sideBar to Firebase
    const [romChats, setRoms] = useState([]);

    const [{user}, dispatch] = useStateValue();
    
    // Here is the code that collect and loads rom contaiin from firebase
     // onSnapshot est la fonction ki veille sur rom en quete d kelconke modification
    //  docs, refer to the list of elements we have in the DB
    //  map,permit us to map list of elements we have in the DB
         useEffect(()=>{
             const unsubscribe = db.collection('romChats').onSnapshot(snapshort=>(
                setRoms(snapshort.docs.map(doc=>({
                  id:doc.id,
                  data:doc.data(), 
                })))
            ));

            return () =>{
                unsubscribe(); 
            } 

        },[])

    return (
        <div className="sideBar">

            {/* <h1>Here is the header */}
            <div className="Sidebar_Header">     
            <Avatar  src ={user.photoURL}/>
                <div className="side_headeright">
                    <IconButton>
                        <DonutSmallOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <ForumOutlinedIcon/>
                        </IconButton>
                    <IconButton>
                        <MoreHorizOutlinedIcon/> 
                    </IconButton>
                </div>
            </div>

            {/* <h1>Here is the searchbar */}
            <div className="Sidebar_Search">
                    <div className = "sidebar_Searchcontainer">
                    
                  
                    <FindReplaceOutlinedIcon/>
                    <input placeholder="Search for Chat" type="text"/>
                </div>
            </div>
            {/* <h1>Here is the Chats */}
            <div className="Sidebar_Chats">
                <SubsideBar addNewchats/>
                {/* Here we pass values via props */}
                  {romChats.map(room =>(
                    <SubsideBar 
                        key={room.id}
                        id={room.id}
                        name = {room.data.name}
                    />
                  ))}

            </div>
        </div>
    )
}

export default SideBar
