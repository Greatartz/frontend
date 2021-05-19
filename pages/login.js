import { signIn } from "next-auth/client";
import { useState } from "react";

export default function login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("values => ", email, " ", pass);
    signIn("credentials", {
      email: email,
      password: pass,
      // The page where you want to redirect to after a
      // successful login
      callbackUrl: `/`,
    });
  };
  return (
    <div className="login">
      <main className="mx-auto">
        <div className={styles.loginStep}>
          <h1>Welcome Back</h1>
          <form onSubmit={(e) => handleLogin(e)}>
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={loginError ? styles.errorInput : ""}
            />
            <span className="tex">{loginError}</span>
            <label htmlFor="inputPassword">Password</label>
            <input
              id="inputPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoginStarted}
              className={styles.blueButtonRound}
            >
              Log In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
