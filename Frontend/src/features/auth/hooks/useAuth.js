import { useDispatch } from "react-redux";
import { registerUser } from "../service/auth.api";
import { setUser } from "../state/auth.slice";


const useAuth = () => {
    const dispatch = useDispatch();
    async function handleRegister({email, password, contact, fullname, isSeller}) {
        const data = await registerUser({email, password, contact, fullname, isSeller});
        dispatch(setUser(data.user));
    }

    return {handleRegister};
};

export default useAuth; 