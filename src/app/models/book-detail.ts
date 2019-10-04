import { Book } from './book';

export interface BooksDetail {
    id: number;
    bookTitleName: string;
    edition: number;
    page: number;
    size: number;
    publishingInfo: string;
    callNumber: string;
    ISBN: string;
    description: string;
    image: string;
    book: Book;
}
