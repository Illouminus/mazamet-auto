export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    category: string;
    model: string;
    stripeProductID: string;
    stripePriceID: string;
    brand: {
        id: string,
        name: string
    };
    createdAt: string;
}

export interface selectedProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    category: string;
    model: string;
    brand: string;
    stripeProductID: string;
    stripePriceID: string;
    updatedAt: string;
    createdAt: string;
}


export interface ProductSchema {
    isLoading: boolean;
    error: boolean;
    productList: Product[];
}
