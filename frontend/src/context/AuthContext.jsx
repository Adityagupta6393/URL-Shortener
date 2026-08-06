import { createContext, useContext, useState } from "react";
import {
    logoutUser,
    refresh,
    getCurrentUser,
} from "../api/auth.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const restoreSession = async () => {
        try {
            const response = await getCurrentUser();

            setUser(response.data.user);

            return true;

        } catch {

            setUser(null);

            return false;

        }
    };



    const logout = async () => {

        try {

            await logoutUser();

        } finally {

            setUser(null);

        }

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                restoreSession,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);