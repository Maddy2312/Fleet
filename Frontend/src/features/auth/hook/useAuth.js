import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../state/auth.slice.js";
import { login, register } from "../service/auth.api.js";

const useAuth = () => {

    const dispatch = useDispatch();
    // REGISTER
    const handleRegister = async ({email, name, password, contact, isSeller = false}) => {

        try {

            const data = await register({email, name, password, contact, isSeller});

            dispatch(setUser(data.user));

            return data;

        } catch (error) {

            throw error;

        }

    };
    // LOGIN
    const handleLogin = async ({email, password}) => {

        try {

            const data = await login({email, password});

            dispatch(setUser(data.user));

            return data;

        } catch (error) {

            throw error;

        }

    };
     return {
        handleRegister,
        handleLogin,
    };
};

export default useAuth;