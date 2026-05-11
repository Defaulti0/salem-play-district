import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase.js';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Create a new document in the User Progress collection for the new user
      // Set the user's progress to false for all locations

      // doc fields are array of 4 booleans corresponding to the locations
      //  in the locations.json file
      // 
      const newUser = userCredential.user;
      const userRef = doc(db, "UserProgress", newUser.uid);

      await setDoc(userRef, {
        vrcenter: false,
        thundervalley: false,
        launchpad: false,
        skatecenter: false,
      });

      navigate('/');
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    }

    setLoading(false);
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button disabled={loading} type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/SignIn">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;