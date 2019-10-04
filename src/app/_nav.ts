interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-people',
  },
  {
    name: 'Librarian',
    url: '/librarian',
    icon: 'icon-list',
  },
  {
    name: 'Author',
    url: '/author',
    icon: 'icon-list',
  },
  {
    name: 'Reader',
    url: '/reader',
    icon: 'icon-list',
  },
  {
    name: 'Reader Type',
    url: '/reader-type',
    icon: 'icon-list',
  },
  {
    name: 'Book',
    url: '/book',
    icon: 'icon-list',
  },
  {
    name: 'Book Title',
    url: '/book-title',
    icon: 'icon-list',
  },
  {
    name: 'Subject',
    url: '/subject',
    icon: 'icon-list',
  },
  {
    name: 'Library Receipts',
    url: '/library-receipts',
    icon: 'icon-credit-card',
    children: [
      {
        name: 'Payment slip',
        url: '/library-receipts/payment-slip',
        icon: 'icon-credit-card',
      },
      {
        name: 'Loan slip',
        url: '/library-receipts/loan-slip',
        icon: 'icon-credit-card',
      }
    ]
  },
];
