import { useRef } from 'react';
import Webcam from 'react-webcam';

const videoContraints = {
    width : 250,
    height : 400,
    facingMode:"user",
}

function WebcamCapture() {

    const webcamRef = useRef(null);

    return (
        <div className="webcamCapture">
            <Webcam 
                audio = { false }
                height = { videoContraints.height }
                width = { videoContraints.width }
                ref = { webcamRef }
                screenshotFormat = "image/jpeg"
                videoConstraints = { videoContraints }
            />
        </div>
    )
}


export default WebcamCapture;