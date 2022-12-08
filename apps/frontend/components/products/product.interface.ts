import Company from '../../features/user/company.interface';
export interface Product {
    _id: string;
    name: string;
    price: number;
    company?: Company;
    description?: string;
    permalink?: string;
    createdAt?: string;
    updatedAt?: string;
    image?: string;
    isPublished?: boolean;
}