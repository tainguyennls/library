import { Author } from './author';
import { Subject } from './subject';

export interface BookTitle {
    idBookTitle: number;
    title: string;
    edition: string;
    page: number;
    size: number;
    publishingInfo: string;
    callNumber: string;
    ISBN: string;
    description: string;
    photo: string;
    yearPublish: number;
    authors: [Author];
    subjects: [Subject];
}
