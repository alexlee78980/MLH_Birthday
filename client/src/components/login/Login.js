import Button from "../others/Button";
import { useHttpClient } from "../hooks/http-hook";
import { useForm } from "../hooks/form-hook";
import Input from "../post/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { useContext } from "react";
import ErrorModal from "../error/ErrorModal";
import { AuthContext } from "../../context/auth-context";
const Login = (props) => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },

        },
        false
    );
    const LoginHandler = async event => {
        event.preventDefault()
    try {
        const user = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/login`, 'POST', JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value}), {
            'Content-Type': 'application/json'
          } );
          auth.loginFunction(user.userId, user.name, user.email, user.birthday)
          props.onClose()
    } catch (err) { console.log(err) }
};

return (
    <div>
    {error && <ErrorModal error={error} onClear={clearError}></ErrorModal>}
        <form className="place-form" onSubmit={LoginHandler}>
            <Input
                id="email"
                element="input"
                label="Email"
                type="email"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid email"
                onInput={inputHandler} />
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid email"
                onInput={inputHandler} />
            <Button disabled={!formState.isValid}>Login</Button>
        </form>
    </div>)
};
export default Login