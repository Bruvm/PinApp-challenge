"use client";

import { useEffect, useState } from "react";
import { getProductBySku } from "@/lib/products.action"
import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Spinner from "@/components/shared/Spinner/Spinner";
import BackButton from "@/components/shared/BackButton/BackButton";
import ImageComponent from "@/components/shared/ImageComponent/ImageComponent";
import { Product } from "@/interface/Product";
import { useParams, useRouter } from "next/navigation";


export default function ProductDetail() {
  const params = useParams();
  const sku = params.sku; 
  const [productDetail, setProductDetail] = useState([]);
  const [loader, setLoader] = useState(false)
  const router = useRouter();  

  const handleSearch = async () => {
    setLoader(true)
    try {
      let response
      if (typeof sku === 'string') {
        response = await getProductBySku(sku);
      }
      setProductDetail(response);
      setLoader(false)
      if (!response || (Array.isArray(response) && response.length === 0)) {
        router.push('/error/404');
      }
    } catch (error) {
      setLoader(false)
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (sku) {
      handleSearch()
    }

  }, [sku]);

  return (
    <div className="grid grid-cols-12 justify-center items-center mt-10 space-y-12 p-5">
      <div className="col-span-12 items-center mb-6">
        <BackButton message={'Volver'} />
        <h1 className="text-center lilita-one-regular text-orange-700">Detalles del producto</h1>
      </div>
      {loader
        ? <div className="col-span-12 mt-6">
          <Spinner />
        </div>
        : <div className="col-span-12 mt-6">
          {Array.isArray(productDetail) && productDetail.length > 0 ? (
            <div className="flex justify-center">
              <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                {productDetail?.map((product: Product) => (
                  <div className="mb-6" key={product.sku}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-orange-700">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center">
                          <ImageComponent imageUrl={product.image} />
                        </div>
                        <span className="text-xs text-muted-foreground"> / SKU: {product.sku} </span>
                        <p><span className="font-bold">Nombre del producto:</span> {product.description}</p>
                        <p><span className="font-bold">Código SKU:</span> {product.sku}</p>
                        <p><span className="font-bold">Categoría:</span> {product.category.name}</p>
                        <p><span className="font-bold">Marca:</span> {product.brand}</p>
                        <p><span className="font-bold">Precio:</span> ${product.price}</p>
                        <p>
                          <span className="font-bold">Especificaciones del producto:</span>
                        </p>
                        <ul className="list-disc pl-5">
                          {product.specifications.map((item: { name: string; value: string }) => (
                            <li key={item.name} className="mb-2">
                              <span className="font-medium">{item.name}:</span> {item.value}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )
            : <div className="col-span-12 mb-4 flex justify-center mt-6">
              <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                <p className="text-center text-orange-950">Lo sentimos, no tenemos información sobre este producto.</p>
              </div>
            </div>
          }
        </div>
      }
    </div >
  );
}

