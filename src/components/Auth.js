import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; 
import Alert from '@mui/material/Alert';  

function Auth({ allowedrole }) {
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const [user, setuser] = useState('');

    useEffect(() => {
        if (token) {
            axios.get(`/`)
                .then((data) => setuser(data.data))
                .catch(() => navigate('/login', { replace: true }));
        } else {
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    return (
        <>
            {token ? 
                user === '' ? 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />  
                    </div> 
                    : allowedrole.includes(user.role) ? 
                        <Outlet /> 
                        : <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Alert severity="error">Access Denied - 403 Forbidden</Alert>
                          </div>
                : <Navigate to={'/login'} replace={true} />
            }
        </>
    );
}

export default Auth;
