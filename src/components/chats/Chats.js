import './chats.css';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Chat from '../chat/Chat';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/appSlice';
import { auth } from '../../firebase';

function Chats() {

    const [posts , setPosts ] = useState([]);
    const user  = useSelector(selectUser);

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

    return (
        <div className = "chats">
            <div className = "chats-header">
                <Avatar src= { user.profilePicture } onClick = { () => auth.signOut() } className = "chats-avatar" />
                <div className = "chats-search" >
                    <SearchIcon />
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
        </div>
    )
}

export default Chats;
