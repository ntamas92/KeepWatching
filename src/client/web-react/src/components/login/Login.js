import React from "react"
import { Link } from "react-router-dom"
import useField from "../../hooks/useField"

//TODO: Eliminate duplication between login and signup
const Login = () => {
  const [username, resetUsername] = useField("text")
  const [password, resetPassword] = useField("password")

  const handleLogin = (event) => {
    event.preventDefault()

    //TODO: Login
    resetUsername();
    resetPassword();
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username: </label>
          <input className="form-control" {...username} />
        </div>

        <div className="form-group">
          <label>Password: </label>
          <input className="form-control" {...password} />
        </div>

        <p>Not a user? Click here to <Link to="/signup" >sign up</Link>.</p>
        <button variant="primary" type="submit" className="btn btn-primary" >Login</button>
      </form>
    </div>
  )
}

export default Login;