import { useDispatch, useSelector } from "react-redux";
import { setItems, addItem, setError, setLoading } from "../state/cart.slice.js";
import { addItemToCart, getCartItems } from "../services/cart.api.js";


const useCart = () => {

    const dispatch = useDispatch();
    const handleAddItem = async ({productId, variantId}) => {
        const data = await addItemToCart({productId, variantId});
        dispatch(addItem(data.cartItem));
        return data;
};

    const handleGetCartItems = async () => {
        const data = await getCartItems();
        dispatch(setItems(data.cart.items));
    }


return {        
    handleAddItem,
    handleGetCartItems
};
}

export default useCart;