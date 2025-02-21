import { News } from "./news";
import { User } from "./user";

export interface Comment {
    id: number;
    author: string;
    author_id: number;
    post: number;
    content: string;
    createdDate: Date;
  }