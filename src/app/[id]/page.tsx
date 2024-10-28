import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Product from "@/components/Product";
import { notFound } from "next/navigation";

interface ProductProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: Readonly<ProductProps>) {
  const { id } = params;
  if (isNaN(Number(id))) {
    notFound();
  }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      notFound();
    }

    const item = await res.json();

    const breadcrumbItems = [
      { label: "Main", href: "/" },
      { label: "Catalog", href: "/" },
      { label: item.title, href: `/${item.id}` },
    ];

    return (
      <>
        <div className="flex flex-col flex-grow font-[family-name:var(--font-satoshi)] text-sm">
          <Header />
          <main className="max-width pt-[64px] mb-[100px] ">
            <Breadcrumbs items={breadcrumbItems} />
            <Product item={item} />
          </main>
        </div>
        <Footer />
      </>
    );
  } catch {
    notFound();
  }
}
