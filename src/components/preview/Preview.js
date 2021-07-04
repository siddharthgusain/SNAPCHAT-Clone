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

    
            <img src= { cameraImage } alt="" />
            <div className="preview-footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview-sendIcon" />
            </div>
        </div>
    )
}

export default Preview;
