"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Item } from "@/store/itemsSlice";
import { actions as favoriteActions } from "@/store/favoriteSlice";

interface ProductProps {
  item: Item;
}

export default function Card({ item }: Readonly<ProductProps>) {
  const dispatch = useDispatch();

  const handlerClick = (id: number) => {
    dispatch(favoriteActions.deleteItem(id));
  };

  return (
    <div
      id={`${item.id}`}
      className="flex flex-col md:flex-row  justify-between md:items-center mt-12 md:mt-[34px]"
    >
      <div className="md:pr-[50px] mb-10 md:mb-0 flex items-center">
        <Image
          src={item.image}
          alt={item.title}
          width={200}
          height={260}
          unoptimized={true}
          className="max-h-[260px] max-w-[200px]"
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center flex-grow justify-between max-w-[682px]">
        <div className="mb-3 md:mb-0">
          <p className="text-sm mb-[17px]">{item.category}</p>
          <Link href={`/${item.id}`}>
            <p className=" font-black text-xl md:max-w-[215px]">{item.title}</p>
          </Link>
        </div>
        <div className="flex gap-10 md:gap-0 md:flex-nowrap">
          <p className="md:px-[22px] font-black text-xl">{`${item.price} $`}</p>
          <button
            className="text-[var(--gray)] text-sm"
            onClick={() => handlerClick(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
