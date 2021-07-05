import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { resetCameraImage, selectcameraImage } from '../../features/cameraSlice';
import './preview.css'
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from 'uuid';
import { db , storage } from '../../firebase';   
import firebase from 'firebase';
 

function Preview() {
    const cameraImage = useSelector(selectcameraImage);
    const history  = useHistory(); 
    const dispatch = useDispatch();

    useEffect(() => {
        if(!cameraImage ){
            history.replace("/");
        }
    },[cameraImage , history ]);

    const closePreview = () =>{

        dispatch(resetCameraImage());
        history.replace("/");

    };  

    const sendPost = () =>{

        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage,"data_url");

        uploadTask.on(

            "state_changed" ,
             null ,
            (error) => {
            console.log(error);
            },

            () => {
                storage
                .ref('posts')
                .child(id)
                .getDownloadURL()
                .then((url) => {
                    db.collection('posts').add({
                        imageUrl : url , 
                        username : "siddharth",
                        read: false,
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    })
                });
                history.replace("/chats");
            }
        );
    };

    return (
        
        <div className = "preview">
            <CloseIcon onClick = { closePreview }  className = "preview-close "/>
            <div className="preview-toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>

    
            <img src= { cameraImage } alt="" style ={{ borderRadius : "10px"}}/>
            <div className="preview-footer" onClick = { sendPost } >
                <h2>Send Now</h2>
                <SendIcon 
                    fontSize="small" 
                    className="preview-sendIcon" 
                       
                />
            </div>
        </div>
    )
}

export default Preview;
