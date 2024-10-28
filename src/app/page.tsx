import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Catalog from "@/components/Catalog";
import Filters from "@/components/Filters";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache",
  });
  const products = await res.json();
  const breadcrumbItems = [
    { label: "Main", href: "/" },
    { label: "Catalog", href: "/" },
  ];
  return (
    <>
      <div className="font-[family-name:var(--font-mplus1p)] flex flex-col flex-grow">
        <Header />
        <main className="max-width flex pt-[25px] justify-between mb-[100px]">
          <Filters />
          <div className="max-w-[705px] flex-grow">
            <Breadcrumbs items={breadcrumbItems} />
            <Catalog products={products} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
