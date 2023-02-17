import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
    return (
        <div className="container">
            <div id='error404'>
                <div id='error-text'>
                    <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
                    <span>404 Error</span>
                    <p className="p-a">The page you were looking for could not be found</p>
                    <Link to='/' class="btn">Go Back Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;