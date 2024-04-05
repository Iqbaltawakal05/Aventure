import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div>
            <div className="headerImg">
                <img src="/header.jpg" alt="placeholder" />
            </div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}