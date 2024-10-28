"use client";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { Item } from "@/store/itemsSlice";
import { actions as favoriteActions } from "@/store/favoriteSlice";
import { RootState } from "@/store/store";
import { ReactElement } from "react";

interface ProductProps {
  item: Item;
}

export default function Product({ item }: Readonly<ProductProps>) {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state: RootState) => state.favorite.ids);
  const isFavoriteItem = favoriteItems.includes(item.id);

  const handlerClick = () => {
    if (isFavoriteItem) {
      dispatch(favoriteActions.deleteItem(item.id));
    } else {
      dispatch(favoriteActions.addItem(item));
    }
  };

  const renderStart = (rate: number): ReactElement => {
    const stars = [];
    for (let i = 0; i <= 4; i += 1) {
      if (i < Math.round(rate)) {
        stars.push(
          <svg
            key={i}
            width="9"
            height="10"
            viewBox="0 0 9 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.27603 0L5.28226 3.45157H8.53851L5.90415 5.58475L6.91038 9.03632L4.27603 6.90313L1.64167 9.03632L2.6479 5.58475L0.013546 3.45157H3.26979L4.27603 0Z"
              fill="#FFC700"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            width="9"
            height="10"
            viewBox="0 0 9 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.27603 0L5.28226 3.45157H8.53851L5.90415 5.58475L6.91038 9.03632L4.27603 6.90313L1.64167 9.03632L2.6479 5.58475L0.013546 3.45157H3.26979L4.27603 0Z"
              fill="#E6E6E6"
            />
          </svg>
        );
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="flex grow flex-wrap sm:flex-nowrap">
      <div className="pt-[11px] pr-[41px] pl-[8px]">
        <Image
          src={item.image}
          alt={item.title}
          width={153}
          height={209}
          unoptimized={true}
          className="max-h-[260px] max-w-[200px]"
        />
      </div>
      <div>
        <div className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-0 justify-between mb-[15px]">
          <div className="max-w-[260px]">
            <h1 className=" font-black text-xl mb-[6px]">{item.title}</h1>
            <div className="flex gap-[6px] items-center">
              {renderStart(item.rating.rate)}{" "}
              <p>{`(${item.rating.count} rated)`}</p>
            </div>
          </div>
          <div>
            <button
              onClick={handlerClick}
              className="flex border-[var(--border)] border-[1px] py-[9px] pr-[17px] pl-[22px] gap-[14px] rounded"
            >
              {isFavoriteItem ? "Unfavorite" : "Add to favorite"}
              <Image
                width={20}
                height={20}
                src="/heart.svg"
                alt="heart"
                className={isFavoriteItem ? "heart-image" : ""}
              />
            </button>
          </div>
        </div>
        <hr />
        <div className="pt-[40px] flex gab-[70px] flex-wrap sm:flex-nowrap">
          <div className="mb-5 sm:mb-0 sm:max-w-[533px]">
            <h2 className="font-black mb-5">Description</h2>
            <p>{item.description}</p>
          </div>
          <div className="flex sm:inline-block gap-6 sm:gap-0 justify-center items-center sm:pl-[60px] text-end	">
            <p className="font-black text-xl sm:mb-[15px]">{`${item.price} $`}</p>
            <button className="py-2 px-[25px]  bg-[var(--yellow)] rounded text-white">
              Купить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
