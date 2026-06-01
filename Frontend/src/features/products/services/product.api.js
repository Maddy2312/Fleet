import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true,
});

export const createProduct = async (formData) => {
    const response = await productApiInstance.post("/create", formData);
    return response.data;
}
export const getAllProducts = async () => {
    const response = await productApiInstance.get("/seller");
    return response.data;
}

export const getProducts = async () => {
    const response = await productApiInstance.get("/getProducts");
    return response.data;
}
export const getProductDetails = async (id) => {
    const response = await productApiInstance.get(`/detail/${id}`);
    return response.data;
}
export const updateProduct = async (id, formData) => {
        for (const [key, value] of formData.entries()) {
  console.log(key, value);
}
    const response = await productApiInstance.put(`/${id}/variants`, formData);
    return response.data;
}