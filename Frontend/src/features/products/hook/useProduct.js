import { useDispatch, useSelector } from "react-redux";
import { setSellerProducts, setLoading, setError } from "../state/product.slice.js";
import { createProduct, getAllProducts } from "../services/product.api.js";

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
     return {
        handleCreateProduct,
        handleGetAllProducts,
    };
};

export default useProduct;