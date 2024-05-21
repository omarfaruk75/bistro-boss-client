import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

const auth = getAuth(app)
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // const googleSignIn = ()
    const logout = () => {
        setLoading(true)
        signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false)
        })
        return () => {
            return unsubscribe();
        }
    }, [])



    const authInfo = {
        user, loading, signIn, createUser, logout
    }



    return (

        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >

    );
};

export default AuthProvider;