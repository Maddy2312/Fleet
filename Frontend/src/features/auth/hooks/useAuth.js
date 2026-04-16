import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../service/auth.api.js";
import { setUser } from "../state/auth.slice.js";


export const useAuth = () => {
    const dispatch = useDispatch();
    async function handleRegister({email, contact, password, fullname, isSeller=false}) {
        const data = await registerUser({email, contact, password, fullname, isSeller});
        dispatch(setUser(data.user)); 
    }
    async function handleLogin({ email, password }) {
        const data = await loginUser({ email, password });
        dispatch(setUser(data.user)); 
    }

    return { handleRegister, handleLogin };
};