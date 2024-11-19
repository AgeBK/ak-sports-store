import { use } from "react";
import { fetchProductsByCategory } from "@/app/lib/data";

export default function Page({
  params,
}: {
  params: Promise<{ urlCategory: string; urlSubCategory: string; id: string }>;
}) {
  console.log("Page");
  const { urlCategory, urlSubCategory } = use(params);

  const products = async () => {
    // const prods = await fetchProducstByCatSubCat(urlCategory, urlSubCategory); // various db calls based on URL
    const prods = await fetchProductsByCategory(urlCategory); // various db calls based on URL
    console.log(prods);
    return prods;
  };
  products();

  return (
    <article>
      {/* <Suspense fallback={<Loading />}> */}
      <h1>
        CATEGORY PAGE - {urlCategory} {urlSubCategory}
      </h1>
    </article>
  );
}
