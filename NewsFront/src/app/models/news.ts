import { Category } from "./category";
import { User } from "./user";

export interface News {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    content: string;
    date: string;
    category: Category;
    author: User;
    comment: number
} 