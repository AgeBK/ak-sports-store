import { Suspense, use } from "react";
import {  fetchProductById } from "@/app/lib/data";
import Product from "@/app/ui/product";
import { DataProps } from "@/app/lib/definitions";
//urlCategory, urlSubCategory
export default function Page({
  params,
}: {
  params: Promise<{
    urlCategory: string;
    urlSubCategory: string;
    urlId: string;
  }>;
}) {
  const promise: Promise<DataProps[]> = fetchProductById(urlId); // suspense handles await

  return (
    <article>
      {/* PRODUCT PAGE - {urlCategory} {urlSubCategory} {urlId} */}
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <Product promise={promise} />
      </Suspense>
    </article>
  );
}
