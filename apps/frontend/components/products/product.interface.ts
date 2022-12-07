export interface Product {
    _id: string;
    name: string;
    price: number;
    company?: string;
    description?: string;
    image?: string;
}