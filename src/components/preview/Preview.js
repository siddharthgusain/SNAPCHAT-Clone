import { useSelector } from 'react-redux'
import { selectcameraImage } from '../../features/cameraSlice';
import './preview.css'

function Preview() {
    const cameraImage = useSelector(selectcameraImage);

    return (
        <div className = "preview">
            <h1> Preview </h1>
            <img src= { cameraImage } alt="" />
        </div>
    )
}

export default Preview
