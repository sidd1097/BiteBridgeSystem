import React, { useState } from "react";
import './App.css';
import Student from "./Components/Student";
import Admin from "./Components/Admin";

function App() {

  // a hook use to set the property of state variable type(i.e. login or signup here)
  const [type, setType] = useState("student");

  // this event will help us to track if user is clicking on Login or Signup button
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  // this variable will help us keep track of className content to apply and remove specific css property
  const containerClass = "container" + (type === "admin" ? "right-side-active" : "");

  return (
    <div className="App">
      <h2>Student / Admin</h2>
      {/* this container is the container use to help in setting the inside containers position property */}
      <div className={containerClass} id="container">
        <Student></Student>
        <Admin></Admin>
        {/* this is the container of overlay and forms containers*/}
        <div className="overlay-container">
          {/* this container will have the left and right side containers inside */}
          <div className="overlay">
            {/* this container covers the left side overlay */}
            <div className="overlay-panel overlay-left">
              <h1>Welcome Admin!</h1>
              <p>
                Please Login to start todays Work
                <br/>
                <br/>
                Are you a Student?
              </p>
              <button
                className="ghost"
                id="student"
                onClick={() => handleOnClick("student")}
              >Student Login
              </button>
            </div>
            {/* this container covers the right side overlay */}
            <div className="overlay-panel overlay-right">
              <h1>Welcome Student!</h1>
              <p>
                Please Login to stay connected with us.
              <br/>
              <br/>
              {/* </p>
              <p> */}
                Are you an Admin!
              </p>
              <button
                className="ghost"
                id="admin"
                onClick={() => handleOnClick("admin")}
              >Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
export default App;
