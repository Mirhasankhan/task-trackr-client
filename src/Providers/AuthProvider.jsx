import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from './firebase.config';


export const AuthContext = createContext(null)

const Provider = ({ children }) => {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    }
    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const resetPassword = (email)=>{
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)            
        })
        return () => {
            unsubscribe
        }
    }, [])

    const infos = {
        user,
        createUser,
        logIn,
        googleSignIn,
        loading,
        logOut,
        updateUserProfile,
        resetPassword
    }
    return (
        <AuthContext.Provider value={infos}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;