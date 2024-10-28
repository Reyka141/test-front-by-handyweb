"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";


import { useSelector } from "react-redux";
import { selector } from "@/store/favoriteSlice";

export default function Product() {
  const favoriteItems = useSelector(selector.selectAll);

  return (
    <>
      <div className="flex flex-col flex-grow font-[family-name:var(--font-satoshi)] text-sm">
        <Header />
        <main className="pt-[64px] mb-[100px]">
          <div className="max-width">
            <h1 className="text-[32px]/[43px]">Favourite</h1>
          </div>
          <hr />
          <div className="max-width pt-10">
            <h2 className="text-2xl">
              {favoriteItems.length === 1
                ? `${favoriteItems.length} item`
                : `${favoriteItems.length} items`}
            </h2>
            {favoriteItems.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
