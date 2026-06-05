import axios from "axios";

const cartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true,
});

export const addItemToCart = async ({productId, variantId}) => {
    const response = await cartApiInstance.post(`/add/${productId}/${variantId}`,{
        quantity: 1,
    });
    return response.data;
}

export const getCartItems = async() => {
    const response = await cartApiInstance.get("/", {
        withCredentials: true,
    });
    return response.data;
}