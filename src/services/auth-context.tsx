import { createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import { validateToken } from "./authenticateService";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string, username?: string) => void;
    logout: () => void;
    user: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [user, setUser] = useState<string | null>(null); // Track Current-user (principal)
    
    const login = (token: string, username?: string) => {
        localStorage.setItem("authToken", token);
        if (username) {
            localStorage.setItem("username", username);
            setUser(username);
        }
        setIsLoggedIn(true);
    };

    // logout
    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setUser(null);
        setIsLoggedIn(false);
    };

    // validate token on mount
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            validateToken(token)
                .then((response) => {
                    // valide token
                    const username = localStorage.getItem("username") || response.username;
                    setIsLoggedIn(true);
                    setUser(username); // Restore username if present
                })
                .catch((error) => {
                    // Invalid token
                    console.warn("Invalid Token");
                    logout();
                })
        } 
    }, []);

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, user}} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must be used within AuthProvider")
    
    return context;
};