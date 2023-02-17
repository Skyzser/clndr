import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar';
import Footer from '../components/Footer';

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className='container'>
            <Calendar />
            <Footer />
        </div>
    );
}

export default Dashboard;