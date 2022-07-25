import { FC, useState } from "react";
import { login, signup } from "./../../lib/auth";

interface IProps {
  setUser: any
}

const Auth: FC<IProps> = ({ setUser }): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) =>
    setUsername(e.currentTarget.value.toLowerCase());

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
  const handleConfirmChange = (e: React.FormEvent<HTMLInputElement>) => setConfirm(e.currentTarget.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const func = isLogin ? login : signup;
    if (!isLogin) {
      if (password !== confirm) {
        return alert("Passwords do not match");
      }
    }
    const result = await func(username, password);
    setUser(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {!isLogin && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            value={confirm}
            onChange={handleConfirmChange}
            required
          />
        )}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account?" : "Already have an account?"}
        </button>
      </form>
    </div>
  );
}

export default Auth