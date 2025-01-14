"use client";

import { useEffect, useState } from "react";
import { getSearchProduct } from "@/lib/products.action"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import Spinner from "@/components/shared/Spinner/Spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeInfo } from "lucide-react";
import { Product } from "@/interface/Product";
import ImageComponent from "@/components/shared/ImageComponent/ImageComponent";

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false)
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setLoader(true)
    try {
      const response = await getSearchProduct(search)
      setProducts(response);
      setLoader(false)
      setHasSearched(true);
    } catch (error) {
      console.error("Error", error);
      setLoader(false)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (search) {
        handleSearch();
      } else {
        setProducts([]);
        setHasSearched(false);
      }
    }, 500);
  }, [search]);

  return (
    <div className="grid grid-cols-12 justify-center items-center mt-10 space-y-12 p-5 min-screen w-full">
      <div className="col-span-12">
        <h1 className="text-center lilita-one-regular text-orange-700">Buscá tu producto </h1>
      </div>

      <div className="col-span-12 mb-4 flex justify-center">
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
          <Input
            className="bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos"
          />
        </div>
      </div>


      {loader
        ? <div className="col-span-12 mt-6">
          <Spinner />
        </div>
        : <div className="col-span-12">
          {products.length > 0 ? (
            <div className="grid grid-cols-12 gap-5">
              {
                products.map((product: Product) => (
                  <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3" key={product.sku}>
                    <Card className="h-full flex flex-col" key={product.sku}>
                      <CardHeader>
                        <CardTitle><span className="text-orange-700">{product.name}</span></CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow ">
                        <div className="flex justify-center">
                          <ImageComponent imageUrl={product.image} />
                         
                        </div>
                        <span className="text-xs text-muted-foreground"> / SKU: {product.sku} </span>
                        <p><span className="font-bold">Categoría:</span> {product.description}</p>
                        <p><span className="font-bold">Marca:</span> {product.category.name}</p>
                        <p><span className="font-bold">Precio:</span> ${product.price}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button asChild>
                          <Link href={`/products/${product.sku}`}>Ver Detalle</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              }
            </div>

          ) : (
            <div className="grid grid-cols-12 gap-5">
              {
                hasSearched ? (
                  <div className="col-span-12 mb-4 flex justify-center mt-6">
                    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                      <p className="text-center text-orange-950">No se encontraron productos.</p>
                    </div>
                  </div>
                )
                  : (
                    <div className="col-span-12 mb-4 flex justify-center mt-6">
                      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                        <Alert className="bg-white">
                          <BadgeInfo className="h-4 w-4" />
                          <AlertTitle>Ey!</AlertTitle>
                          <AlertDescription>
                            Para utilizar esta aplicación tan solo debes colocar el nombre tu producto ó código SKU de tu producto en el buscador.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  )
              }
            </div>

          )}
        </div>
      }
    </div>
  );
}

