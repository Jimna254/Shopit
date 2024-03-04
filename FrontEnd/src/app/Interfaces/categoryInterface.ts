export interface Category {
  category_id: string;
  categoryname: string;
  image: string;
}

export interface categoriesResponse {
  categories: [
    {
      category_id: string;
      categoryname: string;
      image: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}
