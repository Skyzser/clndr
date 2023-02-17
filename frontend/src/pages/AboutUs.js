import Footer from '../components/Footer';
import '../styles/AboutUs.css';

function AboutUs() {
    return (
        <div className='container'>
            <div class="card">
                <div class="details">
                    <p className="p">
                        Our web application, <b className="b">clndr.</b>, is a collaborative project by <i>Group 13</i> as part of the <i>CS353 - Team Project</i> module.
                    </p>
                    <br />
                    <p className="p">
                    The web app follows the MERN stack architecture, with <b className="b">MongoDB</b> as the database, <b className="b">Node.js</b> and <b className="b">Express</b> for the backend server, and <b className="b">React.js</b> for the frontend client.
                    </p>
                    <br />
                    <p className="p"> 
                        Our web app is designed with the intention of allowing users to effectively manage their schedule through the use of a modern and minimalistic calendar.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;