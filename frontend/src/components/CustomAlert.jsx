import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function customToast(message, type) {
    switch(type) {
        case 'info': return (toast.info(message));
        case 'success': return (toast.success(message));
        case 'warning': return (toast.warn(message));
        case 'error': return (toast.error(message));
        default: return (toast(message));
    }
}

function customToastContainer () {
    return (
        <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnHover={true}
            pauseOnFocusLoss={false}
            draggable={true}
            progress={undefined}
            theme='light'
        />
    );
}

export { customToast, customToastContainer };