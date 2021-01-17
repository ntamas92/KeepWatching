import React from "react"
import { Link } from "react-router-dom"

const LoginForm = () => {
  const user = null;

  const handleLogout = (event) => {
    event.preventDefault();
  }

  if (user) {
    return <div>
      {user.name} logged in.
      <button className="btn btn-primary" type="button" onClick={handleLogout}>Log out</button>
      </div>
  }

  return <div><Link to="/login" >Log in</Link></div>
}

export default LoginForm