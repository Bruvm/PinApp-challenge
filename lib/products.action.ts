"use server"
import { redirect } from "next/navigation";

export async function getSearchProduct(query: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          redirect('/error/404');
        } else if (response.status === 500) {
          redirect('/error/500');
        }
        return [];
      }
      const products = await response.json();
      const filteredProducts = products.filter((product: { name: string; sku: string }) =>
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.sku.toLowerCase().includes(query.toLowerCase())
      );

      return filteredProducts.length > 0 ? filteredProducts : [];
    } catch (error) {
      console.error("Error", error);
      return []
    }
  }
  
  
  export async function getProductBySku(sku: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?sku=${sku}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });        
    if (!response.ok) {
      if (response.status === 404) {
        redirect('/error/404');
      } else if (response.status === 500) {
        redirect('/error/500');
      }
      return null;
    }

    const product = await response.json();
    return product;
      } catch (error) {
        console.error("Error inesperado:", error);
        return null;
      }
  }
