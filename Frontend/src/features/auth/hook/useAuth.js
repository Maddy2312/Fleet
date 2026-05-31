import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../state/auth.slice.js";
import { getUser, login, register } from "../services/auth.api.js";

const useAuth = () => {
  const dispatch = useDispatch();
  // REGISTER
  const handleRegister = async ({
    email,
    name,
    password,
    contact,
    isSeller = false,
  }) => {
    try {
      const data = await register({ email, name, password, contact, isSeller });

      dispatch(setUser(data.user));

      return data;
    } catch (error) {
      throw error;
    }
  };
  // LOGIN
  const handleLogin = async ({ email, password }) => {
    try {
      const data = await login({ email, password });

      dispatch(setUser(data.user));

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleGetUser = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getUser();

      dispatch(setUser(data.user));
      dispatch(setLoading(false));
    } catch (error) {
      throw error;
    }finally{
        dispatch(setLoading(false));
    }
  };
  return {
    handleRegister,
    handleLogin,
    handleGetUser,
  };
};

export default useAuth;
