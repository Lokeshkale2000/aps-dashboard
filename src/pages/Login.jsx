import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthHero from "../components/AuthHero"
import SocialButtons from "../components/SocialButtons"
import "../pages/SignUp.css"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }
    localStorage.setItem('userEmail', email)
    navigate("/dashboard")
  }

  return (
    <div className="signupPageX">
      <AuthHero />
      <div className="signupRightX">
        <div className="signupCardX">
          <h2 className="cardTitleX">Log In</h2>
          <p className="cardSubX">
            Don't have an account?{" "}
            <button className="linkBtnX" onClick={() => navigate("/")}>Sign up</button>
          </p>
          <div className="formGroupX">
            <input className="inputX" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formGroupX">
            <input className="inputX" type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="passToggleX" onClick={() => setShowPass(!showPass)}>{showPass ? "Hide" : "Show"}</button>
          </div>
          <button className="createBtnX" onClick={handleSubmit}>Log In</button>
          <SocialButtons />
        </div>
      </div>
    </div>
  )
}