"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { actions as favoriteActions } from "@/store/favoriteSlice";
import { RootState } from "@/store/store";
import { Item } from "@/store/itemsSlice";

interface ProductCardProps {
  item: Item;
}

export default function ProductCard({ item }: Readonly<ProductCardProps>) {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state: RootState) => state.favorite.ids);

  const isFavoriteItem = favoriteItems.includes(item.id);

  const handlerClick = (id: number) => {
    if (favoriteItems.includes(id)) {
      dispatch(favoriteActions.deleteItem(id));
    } else {
      dispatch(favoriteActions.addItem(item));
    }
  };

  return (
    <Link key={item.id} href={`${item.id}`} className="flex-grow sm:flex-grow-0">
      <div
        id={`${item.id}`}
        className="mb-4 sm:mb-0 sm:w-[235px] h-[430px] pb-[13px] border-[1px] border-[var(--border)] flex flex-col justify-between relative"
      >
        <div className="pt-[10px] pl-[22px] pr-[67px] flex">
          <div>
            <p className="text-[#818181] text-sm mb-[10px]">{item.category}</p>
            <p className=" font-medium text-sm">{item.title}</p>
          </div>
        </div>
        <div className="px-10 flex items-center justify-center">
          <Image
            src={item.image}
            alt={item.title}
            width={153}
            height={209}
            unoptimized={true}
            className="max-h-[209px] max-w-[153px]"
          />
        </div>
        <p className="px-[22px] font-black text-2xl">{`${item.price} $`}</p>
        <button
          name="heart"
          className="absolute right-3 top-3 px-2 py-2"
          onClick={(e) => {
            e.preventDefault();
            handlerClick(item.id);
          }}
        >
          <Image
            width={20}
            height={20}
            src="/heart.svg"
            alt="heart"
            className={isFavoriteItem ? "heart-image" : ""}
          />
        </button>
      </div>
    </Link>
  );
}
