import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, provider, signInWithEmailAndPassword, signInWithPopup } from "./firebase";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setEmail("");
    setPassword("");
    setFullName("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        alert(`Welcome back, ${result.user.displayName || result.user.email}`);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        navigate("/home");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully! Please log in.");
        setIsSignIn(true); // Switch to Sign In view after successful signup
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome ${user.displayName}`);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
    } catch (err) {
      alert("Google login failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="sign-box">
        <div className="auth-top">
          <h1>{isSignIn ? "Welcome Back" : "Create Account"}</h1>
          <p>
            {isSignIn
              ? "Login to continue where you left."
              : "Sign up to start coding, compiling, and debugging!"}
          </p>
        </div>

        <div className="auth-bottom">
          <form className="form-box" onSubmit={handleFormSubmit}>
            <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
            {!isSignIn && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isSignIn && (
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">&nbsp;Remember Me</label>
              </div>
            )}
            <button className="btn" type="submit">
              {isSignIn ? "Sign In Now" : "Create Account"}
            </button>

            <button className="btn google-btn" type="button" onClick={handleGoogleLogin}>
              Sign in with Google
            </button>

            <p className="toggle-text">
              {isSignIn
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span onClick={toggleForm}>
                {isSignIn ? "Sign Up" : "Sign In"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;