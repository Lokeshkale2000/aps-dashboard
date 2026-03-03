import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthHero from "../components/AuthHero"
import SocialButtons from "../components/SocialButtons"
import "./SignUp.css"

export default function SignUp() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields")
      return
    }
    navigate("/login")
  }

  return (
    <div className="signupPageX">
      <AuthHero />
      <div className="signupRightX">
        <div className="signupCardX">
          <h2 className="cardTitleX">Sign Up</h2>
          <p className="cardSubX">
            Already have an account?{" "}
            <button className="linkBtnX" onClick={() => navigate("/login")}>Log in</button>
          </p>
          <div className="formRowX">
            <div className="formGroupX">
              <input className="inputX" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="formGroupX">
              <input className="inputX" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="formGroupX">
            <input className="inputX" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formGroupX">
            <input className="inputX" type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="passToggleX" onClick={() => setShowPass(!showPass)}>{showPass ? "Hide" : "Show"}</button>
          </div>
          <div className="termsX">
            <input type="checkbox" /> I agree to Terms & Privacy Policy
          </div>
          <button className="createBtnX" onClick={handleSubmit}>Create Account</button>
          <SocialButtons />
        </div>
      </div>
    </div>
  )
}