import { useDispatch, useSelector } from "react-redux";
import { setSellerProducts, setLoading, setError, setProducts } from "../state/product.slice.js";
import { createProduct, getAllProducts, getProducts } from "../services/product.api.js";

const useProduct = () => {

    const dispatch = useDispatch();
    const handleCreateProduct = async (formData) => {

        try {

            const data = await createProduct(formData);
            return data;

        } catch (error) {

            throw error;

        }

    };
    const handleGetAllProducts = async () => {

        try {

            const data = await getAllProducts();

            dispatch(setSellerProducts(data.products));

            return data.products;

        } catch (error) {

            throw error;

        }

    };
    const handleGetProducts = async () => {

        try {

            const data = await getProducts();

            dispatch(setProducts(data.products));

            return data.products;

        } catch (error) {

            throw error;

        }

    };
     return {
        handleCreateProduct,
        handleGetAllProducts,
        handleGetProducts,
    };
};

export default useProduct;