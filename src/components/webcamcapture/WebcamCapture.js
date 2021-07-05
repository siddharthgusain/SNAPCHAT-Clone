import { useRef ,useCallback } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../../features/cameraSlice';
import { useHistory } from 'react-router-dom';
import './webcamCapture.css';

const videoContraints = {
    width : 250,
    height : 400,
    facingMode:"user",
}

function WebcamCapture() {

    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const capture = useCallback(() =>{

        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push("/preview");

    },[webcamRef , history , dispatch ]);

    return (
        <div className="webcamCapture">
            <Webcam 
                className="webcamcaptureContainer"
                audio = { false }
                height = { videoContraints.height }
                width = { videoContraints.width }
                ref = { webcamRef }
                screenshotFormat = "image/jpeg"
                videoConstraints = { videoContraints }
            />

            <RadioButtonUncheckedIcon
                className = "webcamCapture-button"
                onClick = { capture }
                fontSize = "large"
            />


        </div>
    )
}


export default WebcamCapture;