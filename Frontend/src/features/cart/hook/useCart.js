import { useDispatch, useSelector } from "react-redux";
import { setCart, addItem, setError, setLoading, incrementCartItemQuantityByOne } from "../state/cart.slice.js";
import { addItemToCart, createCardOrder, getCartItems, incrementCartItemQuantity } from "../services/cart.api.js";


const useCart = () => {

    const dispatch = useDispatch();
    const handleAddItem = async ({productId, variantId}) => {
        const data = await addItemToCart({productId, variantId});
        dispatch(addItem(data.cartItem));
        return data;
};

    const handleGetCartItems = async () => {
        const data = await getCartItems();
        dispatch(setCart(data.cart));
    }

    const handleIncrementCartItemQuantity = async ({productId, variantId}) => {
        const data = await incrementCartItemQuantity({productId, variantId});
        dispatch(incrementCartItemQuantityByOne({productId, variantId}))
    }

    const handleCreateCardOrder = async() => {
        const data = await createCardOrder();
        return data.order;
    }

return {        
    handleAddItem,
    handleGetCartItems,
    handleIncrementCartItemQuantity,
    handleCreateCardOrder
};
}

export default useCart;