"use client";
import { ShoppingCartIcon, XCircleIcon,MinusIcon,PlusIcon } from "@heroicons/react/24/outline";
import data from "./api/data";
import { useState } from "react";
export default function Home() {
  const [product, setProduct] = useState(data);
  const [cartProducts, setCartProducts] = useState([]);
  const additem = (product) =>
    setCartProducts([
      ...cartProducts,
      {
        name: product.name,
        price: product.price,
        qty: 1,
      },
    ]);

  const productInCart = (productName) =>
    cartProducts.findIndex((item) => item.name == productName) !== -1;

  const getItem = (productname) =>
    cartProducts.find((item) => item.name == productname);

  const incement = (productname) =>
    setCartProducts((prevItems) =>
      prevItems.map((item) => {
        if (item.name === productname){
          return { ...item, qty: item.qty + 1 } 
        }
        return item;
      })
    );

  const decrement = (productname) =>
    setCartProducts((prevItems) =>
      prevItems.map((item) => {
        if (item.name == productname && item.qty >1){
          return { ...item, qty: item.qty - 1 }
        }
        return item;
      })
    );

  const removeProduct = (itemname) =>
    setCartProducts((prevItems) =>
      prevItems.filter((item) => item.name !== itemname)
    );
    
  const totalProductCount = cartProducts.reduce((ab, item) => ab + item.qty, 0);
  const totalPriceCount = cartProducts.reduce(
    (ab, item) => ab + item.qty * item.price,
    0
  );
  return (
    <div className="flex h-screen w-screen bg-[#fcf8f5] ">
      <div className="w-3/4 h-screen p-4 pr-0 ">
        <h1 className="text-3xl font-bold px-4">Desserts</h1>
        <div className=" grid grid-cols-3 gap-2 overflow-auto overscroll-none h-5/6 pt-5 p-2">
          {product.map((products, index) => (
            <div key={index} className="size-72  flex flex-col p-2  ">
              <div className="size-48  ">
                {" "}
                <img
                  src={products.pic}
                  className="rounded-lg  hover:border-4 border-[#c83b0e]"
                  alt=""
                />
              </div>
              {!productInCart(products.name)?( 
                <button
                className="rounded-full bg-white flex p-2 text-sm  relative bottom-5 left-10 w-fit border border-gray-300 hover:text-[#c83b0e] "
                onClick={() => additem(products)}
              >
                {" "}
                <ShoppingCartIcon className="size-5 " /> Add to Cart{" "}
              </button>
              ):(
                <div className="rounded-full bg-[#c83b0e] flex p-2 text-sm  text-white space-x-5 relative bottom-5 left-10 w-fit border border-gray-300  ">
                  <div className=" " onClick={()=>decrement(products.name)}>
                    <MinusIcon className="size-5  rounded-full hover:cursor-pointer hover:border border-white"/>
                  </div>
                  <p>
                    {getItem(products.name).qty}
                  </p>
                  <div onClick={()=>incement(products.name)}>
                  <PlusIcon className="size-5 rounded-full hover:cursor-pointer hover:border border-white"/>

                  </div>
                </div>
              )}
              <div className="relative bottom-4 space-y-1">
                <p className="text-xs  text-[#9c9291]">{products.category}</p>
                <p className="font-semibold">{products.name}</p>
                <p className="font-semibold text-sm text-[#c83b0e]">
                  ${products.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-screen bg-[#fcf8f5] w-1/4  ">
        <div className=" bg-white w-4/5 h-3/5 rounded-lg p-7 mt-10   ">
          <div className="py-3">
            <h1 className=" text-[#c83b0e] text-2xl font-bold">
              Your Cart ({totalProductCount})
            </h1>
          </div>
          {!totalProductCount ? (
            <div>
              <h1>Add Your product</h1>
            </div>
          ) : (
            <div>
              <div className="">
                {cartProducts.map((items, index) => (
                  <div
                    key={index}
                    className="flex justify-between  border-b-2 border-gray-300 "
                  >
                    <div className="space-y-1">
                      <h3 className="font-semibold">{items.name}</h3>
                      <h3 className=" space-x-3 ">
                        {" "}
                        <span className="text-[#c83b0e] font-semibold">
                          {items.qty}
                        </span>{" "}
                        <span className="text-gray-400">
                          @${items.price.toFixed(2)}
                        </span>
                        <span className="text-gray-500">
                          ${(items.price * items.qty).toFixed(2)}
                        </span>
                      </h3>
                    </div>
                    <div className="self-center" onClick={()=>removeProduct(items.name)}>
                      <XCircleIcon className="size-6 text-gray-400 rounded-full hover:cursor-pointer hover:text-black " />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between py-2">
                <div>
                  <h1 className=" text-sm">Order Total</h1>
                </div>
                <div>
                  <h1 className=" text-2xl font-bold">
                    ${totalPriceCount.toFixed(2)}
                  </h1>
                </div>
              </div>
              <div className="h-10  bg-[#fcf8f5]">
                <h1 className="text-center p-1">
                  This is a{" "}
                  <span className="font-semibold">carbon-neutral</span> delivery
                </h1>
              </div>
              <div className="w-full py-5">
                <button className="bg-[#c83b0e] rounded-full w-full h-12 text-white" 
                onClick={() => window.location.reload()}>
                  {" "}
                  Confirm Order{" "}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
