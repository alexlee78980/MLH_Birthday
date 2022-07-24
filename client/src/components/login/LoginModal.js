import { useState } from "react";
import Modal from "../Modals/Modal";
import Button from "../others/Button";
import Login from "./Login";
import SignUp from "./SignUp";

const LoginModal = (props) =>{
    const [login, setLogin] = useState(true)
    const loginHandler = () =>{
        setLogin(true)
    }
    const signUpHandler = () =>{
        setLogin(false)
    }
    const closeHandler = () =>{
        props.onClose()
    }
    return (<Modal>
        <Button onClick={loginHandler}>Login</Button> <Button onClick={signUpHandler}>Sign Up </Button> <Button onClick={closeHandler}>Close</Button> 
        {login ? <Login onClose={closeHandler}></Login>: <SignUp onClose={closeHandler}></SignUp>}
        
    
    </Modal>)
};

export default LoginModal