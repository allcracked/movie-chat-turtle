import React from 'react';
import firebase from 'firebase/app';

import { fbAuth } from '../../services/firebase';

const Login: React.FC = () => {

    const handleGoogleLogin = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await fbAuth.signInWithPopup(googleProvider);
    };

    return (
        <div>
            <p>Login</p>
            <button type='button' onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
