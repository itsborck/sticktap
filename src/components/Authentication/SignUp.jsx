import { useState } from "react";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing up with Google: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <form onSubmit={handleSignUp} className="p-6 bg-gray-700 rounded shadow-md text-white">
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-6 border-b-2 border-indigo-500 outline-none bg-gray-600 focus:bg-gray-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border-b-2 border-indigo-500 outline-none bg-gray-600 focus:bg-gray-500"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-indigo-700 hover:bg-indigo-900 text-white font-semibold rounded-lg"
        >
          Sign Up
        </button>
        <button type="button" onClick={handleGoogleSignUp} className="w-full p-2 bg-white hover:bg-gray-200 text-black font semibold rounded-lg mt-4">
          Sign Up with Google
        </button>
      </form>
    </div>
  );
}

export default SignUp;
