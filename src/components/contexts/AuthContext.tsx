import React, { useContext, useState, useEffect, ReactNode } from "react"
import { auth } from "../../config/firebase"

const AuthContext = React.createContext<any>(0)

export function useAuth() {
    return useContext(AuthContext)
}

interface IProps {
    children: ReactNode
}
export function AuthProvider({ children }: IProps) {
    const [currentUser, setCurrentUser] = useState<any>()
    const [loading, setLoading] = useState(true)

    function signup(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email: string) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email: string) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password: string) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}