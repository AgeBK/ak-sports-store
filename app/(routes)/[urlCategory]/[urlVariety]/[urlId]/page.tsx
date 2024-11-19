import { use } from "react";
import { fetchProducstByCatSubCat } from "@/app/lib/data";
//urlCategory, urlSubCategory
export default function Page({
  params,
}: {
  params: Promise<{ urlCategory: string; urlSubCategory: string; id: string }>;
}) {
  console.log("Page");
  const { urlCategory, urlSubCategory, id } = use(params);

  const products = async () => {
    const prods = await fetchProducstByCatSubCat(urlCategory, urlSubCategory); // various db calls based on URL
    return prods;
  };
  products();

  return (
    <article>
      {/* <Suspense fallback={<Loading />}> */}
      <h1>
        PRODUCT PAGE - {urlCategory} {urlSubCategory} {id}
      </h1>
    </article>
  );
}
