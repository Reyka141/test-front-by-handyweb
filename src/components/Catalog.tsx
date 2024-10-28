"use client";
import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { actions as itemsActions, selector, Item } from "@/store/itemsSlice";
import { RootState } from "@/store/store";
import { uniq } from "lodash";

interface CatalogProps {
  products: Item[];
}

const ProductCard = lazy(() => import("./ProductCard"));

export default function Catalog({ products }: Readonly<CatalogProps>) {
  const items = useSelector(selector.selectAll);
  const activeCategories = useSelector(
    (state: RootState) => state.items.activeCategories
  );
  const search = useSelector((state: RootState) => state.items.search);
  const [sort, setSort] = useState("desc");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(itemsActions.addItems(products));
    const categories: string[] = uniq(
      products.map((item: Item) => item.category)
    );
    dispatch(itemsActions.addCategories(categories));
  }, [dispatch, products]);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (
          activeCategories.length > 0 &&
          !activeCategories.includes(item.category)
        ) {
          return false;
        }
        if (search !== "" && !item.title.toLowerCase().includes(search)) {
          return false;
        }
        return true;
      })
      .sort((a, b) =>
        sort === "desc" ? b.price - a.price : a.price - b.price
      );
  }, [items, activeCategories, search, sort]);

  return (
    <div className="font-[family-name:var(--font-satoshi)] font-normal max-w-[705px]">
      <h1 className="font-medium text-xl mb-[30px]">Catalog</h1>
      <button
        className="flex gap-[5px] items-baseline text-sm mb-7"
        onClick={() => setSort((state) => (state === "desc" ? "asc" : "desc"))}
      >
        Price{" "}
        <Image
          src="/arrow.svg"
          width={6}
          height={3}
          alt="arrow"
          className={sort === "desc" ? "rotate-90" : "-rotate-90"}
        />
      </button>
      <div className="flex flex-wrap">
        <Suspense fallback={<div>Loading...</div>}>
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
