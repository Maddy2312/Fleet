import { useDispatch, useSelector } from "react-redux";
import { setSellerProducts, setLoading, setError, setProducts } from "../state/product.slice.js";
import { createProduct, getAllProducts, getProductDetails, getProducts, updateProduct } from "../services/product.api.js";

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
    const handleGetProductDetails = async (id) => {

        try {

            const data = await getProductDetails(id);

            return data.product;

        } catch (error) {

            throw error;

        }

    };
    const handleCreateVariant = async (id, formData) => {

        try {

            const data = await updateProduct(id, formData);

            return data.product;

        } catch (error) {

            throw error;

        }

    };
     return {
        handleCreateProduct,
        handleGetAllProducts,
        handleGetProducts,
        handleGetProductDetails,
        handleCreateVariant,
    };
};

export default useProduct;