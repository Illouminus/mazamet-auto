interface Brand {
    _id: string;
    name: string;
    models: any[]; // Если у вас есть конкретные модели, замените any на соответствующий тип
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Category {
    _id: string;
    name: string;
    products: string[];
    model: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Model {
    _id: string;
    name: string;
    brand: string;
    categories: any[]; // Если у вас есть конкретные категории, замените any на соответствующий тип
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    brand: Brand;
    category: Category;
    model: Model;
    stripeProductID?: string; // Опциональное поле, так как не все продукты имеют его
    stripePriceID?: string; // Опциональное поле, так как не все продукты имеют его
    createdAt: string;
    updatedAt: string;
    __v: number;
}
