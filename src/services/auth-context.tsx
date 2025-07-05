import { createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    user: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [user, setUser] = useState<string | null>(null);
    
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
        const savedUser = localStorage.getItem("username");
        if (token) {
            setIsLoggedIn(true);
            setUser(savedUser); // Restore username if present
        } else {
            setIsLoggedIn(false);
            setUser(null);
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