import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});


// REGISTER USER
export const register = async ({email, name, password, contact, isSeller}) => {

    try {

        const response = await authApiInstance.post("/register", {email, name, password, contact, isSeller});

        return response.data;

    } catch (error) {

        throw error.response.data;

    }

};

// LOGIN USER
export const login = async ({email, password}) => {

    try {

        const response = await authApiInstance.post("/login", {email, password});

        return response.data;

    } catch (error) {

        throw error.response.data;

    }

};