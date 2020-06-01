import React from 'react';
import { useHistory } from 'react-router-dom';

import { fbAuth } from '../../services/firebase';

const Home: React.FC = () => {
    const history = useHistory();

    const handleLogout = (): void => {
        fbAuth.signOut();
        history.push('/');
    };

    return (
        <div>
            <p>This is home</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
