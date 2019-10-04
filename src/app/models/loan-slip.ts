export interface LoanSlip {
    id: number;
    user: string;
    librarian: string;
    dateBorrow: string;
    dateWillReturn: string;
    quantity: number;
    status: string;
}
