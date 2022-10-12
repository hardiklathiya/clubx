import React, { useState } from "react";
import axios from "axios";
import ProductContext from "./ProductContext";
export default function NoteState(props) {
  const host = "http://localhost:80";
  const [products, setProducts] = useState([]);

  //*fetch all products
  const getProducts = async () => {
    const url = `${host}/products`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json);
    
    setProducts(json);
  };

  return (
    <ProductContext.Provider value={{ products, getProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
}
