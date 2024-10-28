import Link from "next/link";
import Image from "next/image";
import React from "react";

interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-[29px] font-[family-name:var(--font-satoshi)]">
      <ol className="flex gap-[10px] text-sm items-center justify-center">
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <li  className="breadcrumb-item">
              {index < items.length - 1 ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span className="font-bold">{item.label}</span>
              )}
            </li>
            {index < items.length - 1 ? (
              <Image
              src="/arrow.svg"
              width={6}
              height={3}
              alt="arrow"
            />
            ) : null}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
