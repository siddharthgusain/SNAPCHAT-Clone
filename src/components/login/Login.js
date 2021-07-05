import './login.css';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { auth , provider } from '../../firebase';
import { login } from '../../features/appSlice'; 

function Login() {

    const dispatch  = useDispatch();

    const signIn = () => {

        auth.signInWithPopup(provider)
        .then(result =>{
            
            dispatch(
                login({
                username : result.user.displayName,
                profilePicture : result.user.photoURL,
                id:result.user.uid,
            })
            );
        })
        .catch(error => alert(error.message));

        
    };

    return (
        <div className="login">
            <div className ="login-container">
                <img src ="https://yt3.ggpht.com/ytc/AKedOLSuVe8rfS92TYU_SonDcNA6Zd1gufGWKHbhVaEtSQ=s900-c-k-c0x00ffffff-no-rj" 
                    alt = " "
                    />
                <Button variant='outlined' onClick = { signIn } >Sign in</Button>
            </div>
        </div>
    )
}

export default Login;
