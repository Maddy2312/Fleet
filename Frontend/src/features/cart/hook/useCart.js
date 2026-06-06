import { useDispatch, useSelector } from "react-redux";
import { setItems, addItem, setError, setLoading, incrementCartItemQuantityByOne } from "../state/cart.slice.js";
import { addItemToCart, getCartItems, incrementCartItemQuantity } from "../services/cart.api.js";


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

    const handleIncrementCartItemQuantity = async ({productId, variantId}) => {
        const data = await incrementCartItemQuantity({productId, variantId});
        dispatch(incrementCartItemQuantityByOne({productId, variantId}))
    }

return {        
    handleAddItem,
    handleGetCartItems,
    handleIncrementCartItemQuantity
};
}

export default useCart;