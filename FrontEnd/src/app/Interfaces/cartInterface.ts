export interface Cart {
  user_id: string;
  cart_id: string;
  productname: string;
  image: string;
  quantity: number;
  price: number;
  description: string;
}

export interface OneUsercartResponse {
  cartDetails: [
    {
      cart_id: string;
      quantity: number;
      product_id: string;
      name: string;
      price: number;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}

export interface deleteItemCart {
  cart_id: string;
  product_id: string;
}
