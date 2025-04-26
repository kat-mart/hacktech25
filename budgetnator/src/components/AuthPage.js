// AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import { signUp, signIn } from "./authFunctions";

function AuthPage() {
  const navigate = useNavigate(); // initialize useNavigate
  const [isSigningUp, setIsSigningUp] = useState(true); // true = Sign Up form, false = Sign In form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSigningUp) {
        await signUp(email, password);
        alert("User created successfully!");
      } else {
        await signIn(email, password);
        alert("Signed in successfully!");
      }

      // Redirect to Home after successful sign in or sign up
      navigate("/home"); // Redirects user to Home page
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const toggleMode = () => {
    setIsSigningUp((prev) => !prev);
  };

  return (
    <div>
      <h2>{isSigningUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
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
        <button type="submit">{isSigningUp ? "Sign Up" : "Sign In"}</button>
      </form>

      <p>
        {isSigningUp ? "Already have an account?" : "Don't have an account?"}
        <button onClick={toggleMode} style={{ marginLeft: "8px" }}>
          {isSigningUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;
