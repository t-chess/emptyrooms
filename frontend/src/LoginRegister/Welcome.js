import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider.js";
import axios from "axios";

const Welcome = () => {
  const [registerPage, setregisterPage] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const { login, register } = useContext(AuthContext);

  useEffect(() => {
    setusername("");
    setpassword("");
    seterror("");
  }, [registerPage]);

  const checkUsername = (un) => {
    if (registerPage) {
      axios.get("/usernameAvailable/" + un).then((response) => {
        if (!response.data.success) {
          seterror("username already taken");
        } else {
          seterror("");
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerPage) {
      register({ username, password }, (errorMessage) => {
        seterror(errorMessage);
      });
    } else {
      login({ username, password }, (errorMessage) => {
        seterror(errorMessage);
      });
    }
  };

  return (
    <main className='home'>
      <h1>empty rooms</h1>
      {registerPage ? (
        <p>
          Back to{" "}
          <button className='anchor' onClick={() => setregisterPage(false)}>
            login
          </button>
          .
        </p>
      ) : (
        <p>
          Sign in or register{" "}
          <button className='anchor' onClick={() => setregisterPage(true)}>
            here
          </button>
          .
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          name='username'
          type='text'
          placeholder='Username'
          onChange={(e) => setusername(e.target.value)}
          onBlur={(e) => checkUsername(e.target.value)}
        />
        <input
          username={password}
          name='password'
          type='password'
          placeholder='Password'
          onChange={(event) => setpassword(event.target.value)}
        />
        <p className='errorlog'>{error}</p>
        <button type='submit'>
          <span>{registerPage ? "Register" : "Start"}</span>
        </button>
      </form>
    </main>
  );
};

export default Welcome;
