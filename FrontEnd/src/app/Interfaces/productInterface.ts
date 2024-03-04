export interface Product {
  productname: string;
  category_id: string;
  quantity: string;
  description: string;
  price: string;
  image: string;
}

export interface productsResponse {
  products: [
    {
      productname: string;
      category_id: string;
      quantity: string;
      description: string;
      price: string;
      image: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}
