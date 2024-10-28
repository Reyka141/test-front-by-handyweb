"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { actions as itemsActions } from "@/store/itemsSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export default function Header() {
  const dispatch = useDispatch();
  const route = useRouter();
  const search = useSelector((state: RootState) => state.items.search);
  const [value, setValue] = useState(search);

  const handlerSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(itemsActions.setSearch(value.toLowerCase().trim()));
    if (value.trim() !== "") {
      route.push("/");
    }
  };

  return (
    <header className="font-[family-name:var(--font-satoshi)] font-normal">
      <div className=" flex justify-between items-end pb-3 max-width">
        <Link href="/">
          <Image
            src="/logo.svg"
            width={116}
            height={67}
            alt="Gushop clothes store"
          />
        </Link>
        <div className=" relative flex-grow max-w-[428px] hidden md:inline-block">
          <form onSubmit={handlerSubmit} className=" flex flex-grow">
            <input
              type="text"
              placeholder="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="pl-[25px] pr-[49px] pt-[17px] pb-[15px] border-[1px] rounded-lg flex-grow flex text-base"
            />
          </form>

          <Image
            width={19}
            height={19}
            src="/loupe.svg"
            alt=""
            className=" absolute right-[22px] top-5 pointer-events-none"
          />
        </div>

        <div className=" pt-[25px] hidden md:inline-block">
          <Link href="favorite" className="flex flex-col items-center">
            <Image width={20} height={20} src="/heart.svg" alt="" />
            <p className="text-sm ">favorite</p>
          </Link>
        </div>
        <div>
          <button className="inline-block md:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr />
      <div className="max-width">
        <nav className="hidden  md:inline-block">
          <ul className="flex py-[15px] gap-8 text-sm  font-[family-name:var(--font-mplus1p)]">
            <li>
              <Link href="/">Main page</Link>
            </li>
            <li>Delivery</li>
            <li>Contact</li>
            <li>Blog</li>
          </ul>
        </nav>
      </div>

      <hr />
    </header>
  );
}
