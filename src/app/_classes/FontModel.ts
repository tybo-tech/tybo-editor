export interface Files {
    regular: string;
    italic: string;
    500: string;
    600: string;
    700: string;
    800: string;
    100: string;
    200: string;
    300: string;
    900: string;
    '500italic': string;
    '600italic': string;
    '700italic': string;
    '800italic': string;
    '900italic': string;
    '100italic': string;
    '300italic': string;
    '200italic': string;
}

export interface Item {
    family: string;
    variants: string[];
    subsets: string[];
    version: string;
    lastModified: string;
    files: Files;
    category: string;
    kind: string;
}

export interface FontModel {
    kind: string;
    items: Item[];
}
