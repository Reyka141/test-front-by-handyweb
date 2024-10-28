"use client";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "@/store/itemsSlice";
import { RootState } from "@/store/store";

export default function Filters() {
  const categories = useSelector((state: RootState) => state.items.categories);
  const activeCategories = useSelector(
    (state: RootState) => state.items.activeCategories
  );
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.parentElement?.textContent ?? "";
    if (activeCategories.includes(category)) {
      dispatch(actions.removeActiveCategory(category));
    } else {
      dispatch(actions.addActiveCategory(category));
    }
  };

  const Checkbox = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return (
      <label className="flex cursor-pointer">
        <input
          type="checkbox"
          className="mr-[10px] cursor-pointer"
          checked={value}
          onChange={onChange}
        />
        {label}
      </label>
    );
  };

  return (
    <div className="font-[family-name:var(--font-satoshi)] font-normal pr-8 hidden md:inline-block">
      <h2 className="text-[15px]/[20px] mb-8 font-medium">Filters</h2>
      <div className="flex flex-col gap-4">
        {categories.map((category) => {
          const isActive = activeCategories.includes(category);
          return (
            <Checkbox
              key={category}
              label={category}
              value={isActive}
              onChange={handleChange}
            />
          );
        })}
      </div>
    </div>
  );
}
