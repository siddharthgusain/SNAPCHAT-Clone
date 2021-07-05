import './chats.css';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Chat from '../chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/appSlice';
import { auth } from '../../firebase';
import RadioButtonUncheckedIcon  from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from '../../features/cameraSlice';

function Chats() {

    const [posts , setPosts ] = useState([]);
    const user  = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() =>{

        db.collection('posts')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot) => {

            setPosts(
                snapshot.docs.map(doc => ({
                id: doc.id , 
                data : doc.data(),
            }))
            )
        });
    },[]);

    const takesnap = () => {

        dispatch(resetCameraImage());
        history.push("/");


    }

    const signOut = () => {
        
        auth.signOut().then(() =>{

            history.replace("/");
            alert("signed out");

        });
        

    }

    return (
        <div className = "chats">

            <div className = "chats-header">
                <Avatar src= { user.profilePicture } onClick = { signOut } className = "chats-avatar" />
                <div className = "chats-search" >
                    <SearchIcon className="chats-searchIcon" />
                    <input placeholder = "Friends" type = "text" />
                </div>
                <ChatBubbleIcon className ="chats-chatIcon" />
            </div>
            <div className ="chats-posts">
               {
                   posts.map( ( { id , data : { profilePic , username , timestamp , imageUrl , read }} ) => {
                       return  <Chat 
                            key = {id}
                            id = {id}
                            username = {username}
                            timestamp = {timestamp}
                            imageUrl = {imageUrl}
                            read = {read}
                            profilePic = {profilePic}
                        />
                   })
               }
            </div>
            <RadioButtonUncheckedIcon 
            className="chats-takePicIcon"
            onClick = { takesnap }
            fontSize = 'large'
            />
        </div>
    )
}

export default Chats;
