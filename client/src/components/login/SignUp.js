import Button from "../others/Button";
import Input from "../post/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const SignUp = (props) => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            birthday: {
                value: '',
                isValid: false
            },

        },
        false
    );
    const signUpHandler = async event => {
        event.preventDefault()
        console.log(formState.inputs.name.value)
        console.log(formState.inputs.password.value)
    try {
        const user = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, 'POST', JSON.stringify({name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        birthday: formState.inputs.birthday.value}), {
            'Content-Type': 'application/json'
          } );
        auth.loginFunction(user.userId, user.name, user.email, user.birthday)
        props.onClose()
    } catch (err) { console.log(err) }
};

return (
    <div>
        <form className="place-form" onSubmit={signUpHandler}>
            <Input
                id="name"
                element="input"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid email"
                onInput={inputHandler} />
            <Input
                id="email"
                element="input"
                label="Email"
                type='email'
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid email"
                onInput={inputHandler} />
            <Input
                id="password"
                element="input"
                label="Password"
                type='password'
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid email"
                onInput={inputHandler} />
            <Input
                id="birthday"
                element="input"
                label="Birthday"
                type='date'
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid email"
                onInput={inputHandler} />

            <Button disabled={!formState.isValid}>Sign up</Button>
        </form>
    </div>)
};
export default SignUp