import Button from "../others/Button";

const SignUp = () => {
    return(<div className="card">
        <label>E-mail</label>
        <br></br>
        <input></input>
        <br></br>
        <label>Name (or Nickname)</label>
        <br></br>
        <input></input>
        <br></br>
        <label>Password</label>
        <br></br>
        <input></input>
        <br></br>
        <label>Birthday</label>
        <br></br>
        <input type="date"></input>
        <br></br>
        <br></br>
        <Button>Sign up</Button>
    </div>)
};
export default SignUp