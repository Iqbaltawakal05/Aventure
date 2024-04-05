export default function Login() {
  return (
    <div className="login-page">
        <div className="login-header">
            <img src='/wave.svg' alt="login icon"/>
        </div>
        <div className="login-body">
            <div className="login-container">
                <img src='/authIcon.svg' alt="login icon"/>
            <div className="login-form">
                <h1>Login</h1>
                {/* {!!notif.length && <h5>{notif}</h5>} */}
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button type="submit" className="login-btn">Login</button>
                <button type="submit" className="back-btn" onClick={() => window.history.back()}>Back</button>
                <div className="link-register">
                    <p>Don't have an account?</p>
                        <a href="/register">register</a>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}