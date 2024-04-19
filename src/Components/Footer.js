export default function Footer() {
    return (
        <footer className="footer">
        <div className="container">
            <div className="row">
            <div className="col-md-4">
                <h1>Aventure</h1>
                <p>Adventure Is Calling</p>
                <p>Let's Aventure</p>
            </div>
            <div className="col-md-4">
                <h5>About Us</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non justo id libero suscipit congue.</p>
            </div>
            <div className="col-md-4">
                <h5>Contact Us</h5>
                <ul className="list-unstyled">
                <li>jakarta sonoan dikit, jambi, indonesia</li>
                <li>Email: jojo@gmail.com</li>
                <li>Phone: 081234567890</li>
                </ul>
            </div>
            </div>
            <div>
            <h5>Follow Us</h5>
                <ul className="list-inline social-icons">
                <li className="list-inline-item"><a href="#"><i className="bi bi-facebook" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="bi bi-twitter" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="bi bi-instagram" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="bi bi-linkedin" /></a></li>
            </ul>
            </div>
        </div>
        </footer>
    )
}