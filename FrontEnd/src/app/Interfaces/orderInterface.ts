export interface Order {
  user_id: string;
  cart_id: string;
  username: string;
  isCancel: boolean;
  quantity: string;
  descript: number;
  total_prices: number;
  status: string;
  orderCreatedat: string;
}

export interface ordersResponse {
  orders: [
    {
      username: string;
      isCancel: boolean;
      quantity: string;
      total_prices: number;
      status: string;
      orderCreatedat: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}
