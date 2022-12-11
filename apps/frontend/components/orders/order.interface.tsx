import { Product } from "../products/product.interface";

export interface Order {
    _id: string;
    user: string;
    products: Product[];
    total: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}