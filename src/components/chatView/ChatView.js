import { useSelector } from 'react-redux';
import './chatView.css';
import { selectSelectedImage } from '../../features/appSlice';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatView() {

    const selectedImage  = useSelector(selectSelectedImage);
    const history  = useHistory();

    useEffect(() =>{

        if(!selectedImage){
            exit();
        }

    },[selectedImage]);

    const exit = () =>{

        history.replace('/chats');

    }

    return (
        <div className="chatView" >
            <img src = { selectedImage } onClick={ exit } alt="" />
            <div className = "chatView-timer">
                <CountdownCircleTimer
                    isPlaying
                    duration = { 10 }
                    strokeWidth = { 6 }
                    size = { 50 }
                    colors = {
                        [
                            ["#4CBB17" , 0.33],
                            ["#FFFF00" , 0.33],
                            ["#A30000" , 0.33],
                        ]
                    }

                >
                    {({ remainingTime })  =>{

                        if(remainingTime === 0){
                            exit();
                        }
                        
                        return remainingTime;
                    }}

                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView;
