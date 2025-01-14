export interface Product {
    sku: string;
    name: string;
    description: string;
    image: string;
    category: {
      id: string,
      name: string
    }
    brand: string;
    price: number;
    stock: number;
    specifications: [
      { 
        name: string, 
        value: string 
      }
    ]
  }