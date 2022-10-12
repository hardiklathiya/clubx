import React, { useContext } from "react";
import { useEffect } from "react";
import ProductContext from "../../context/ProductContext";

export default function Demo() {
  const context = useContext(ProductContext);
  const { products, getProducts } = context;
  //   console.log(products);
  const product = products.products;
  console.log(product);
  useEffect(() => {
    getProducts();
  });

  return (
    <div>
      {product.map((prod) => {
        return (
          <>
            <h1>{prod.ratings}</h1>
          </>
        );
      })}
    </div>
  );
}
