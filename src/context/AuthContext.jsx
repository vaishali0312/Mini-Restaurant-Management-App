import  {createContext,useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
export const AuthContext=createContext();
export default function AuthProvider({children}){
    const navigate=useNavigate();
    const [user,setUser]=useState(null);
    useEffect(()=>{
        
        const stored=JSON.parse(localStorage.getItem("authUser"));
        if(stored) setUser(stored);
    },[]);
    const login=(email,password)=>{
        const admin={role:"admin",email:"admin@gmail.com",pwd:"admin1234"};
        const customer={role:"customer",email:"customer@gmail.com",pwd:"customer1234"};
    };
    if(email===admin.email && password===admin.pwd){
        const u={role:admin.role,email:admin.email};
        setUser(u);
        localStorage.setItem("authUser",JSON.stringify(u));
        navigate("/admin/dashboard");
        alert("Admin logged in successfully");
    }else if(email===customer.email && password===customer.pwd){
        const u={role:customer.role,email:customer.email};
        setUser(u);
        localStorage.setItem("authUser",JSON.stringify(u));
        navigate("/customer/dashboard");
        alert("Customer logged in successfully");
    }else{
        alert("Invalid credentials");
    }   

    const logout=()=>{
        setUser(null);
        localStorage.removeItem("authUser");
        navigate("/login");
    };
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};
