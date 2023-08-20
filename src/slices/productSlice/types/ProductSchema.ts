export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    category: string;
    model: string;
    createdAt: string;
}

export interface ProductSchema {
    isLoading: boolean;
    error: boolean;
    productList: Product[];
}
