import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider, onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateEmail,
    updateProfile,
} from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';

const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope('email');

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const googleAuth = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGoogle);
    }
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUser = (updatedData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData);
    }
    const updateUserEmail = (newEmail) => {
        setLoading(true);
        return updateEmail(auth.currentUser, newEmail);
    }
    const signOutUser = () => {
        return signOut(auth);
    }
    const userPasswordResetEmail = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // setUser(currentUser);
            // setLoading(false);
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    const authData = {
        user,
        setUser,
        createUser,
        signOutUser,
        logIn,
        updateUser,
        loading,
        setLoading,
        googleAuth,
        userPasswordResetEmail,
        updateUserEmail,
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};
export default AuthProvider;