import React, { createContext, useState, useEffect } from "react";
import { fbAuth } from "../services/firebase";

type UserProps = {
    user: firebase.User | null;
    loggedIn: boolean;
    setUser(value: React.SetStateAction<firebase.User | null>): any;
};

export const AuthContext = createContext<Partial<UserProps>>({});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    
    useEffect(() => {
        fbAuth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, loggedIn: user !== null, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};