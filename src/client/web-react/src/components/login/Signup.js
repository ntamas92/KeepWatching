import React from "react"
import { Link } from "react-router-dom"

import useField from "../../hooks/useField"

const Signup = () => {
  const [username, resetUsername] = useField("text")
  const [name, resetName] = useField("text")
  const [password, resetPassword] = useField("password")

  const handleSignup = (event) => {
    event.preventDefault()

    //TODO: Login
    resetName();
    resetUsername();
    resetPassword();
  }

  return (
    <div>
      <h3>Sign up</h3>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label className="col-form-label">Name: </label>
          <input className="form-control" {...name}/>
        </div>

        <div className="form-group">
          <label className="col-form-label">Username: </label>
          <input className="form-control" {...username} />
        </div>

        <div className="form-group">
          <label className="col-form-label">Password: </label>
          <input className="form-control" {...password} />
        </div>

        <p>Already a user? Click here to <Link to="/login" >log in</Link>.</p>
        <button variant="primary" type="submit" className="btn btn-primary" >Sign up</button>
      </form>
    </div>

  )
}

export default Signup;