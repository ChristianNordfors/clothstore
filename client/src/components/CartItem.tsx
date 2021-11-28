import * as React from "react";
import Button from "@mui/material/Button";

type CartItemType = {
  id: string;
  amount: number;
  price: number;
  image: string;
  title: string;
  category: string;
};

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: string) => void;
};

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
  return (
    <div>
      <div>
        <h3>{item.title}</h3>
        <div>
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </div>
  );
};

export default CartItem;
