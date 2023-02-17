import { useState, useEffect } from 'react';
import { userDataFetch } from '../Endpoints';

import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
    const [userData, setUserData] = useState([]);
    const getUserData = async () => { setUserData(await userDataFetch()); };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className='container'>
            <div class="card">
                <div class="details">
                    <h2 className='h2'>Username: <p className='p'>{userData.username}</p></h2>
                    <h2 className='h2'>Email: <p className='p'>{userData.email}</p></h2>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;