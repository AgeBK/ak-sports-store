import { Suspense, use } from "react";
import { fetchCategoryPageData } from "@/app/lib/utils";
import { DataProps } from "@/app/lib/definitions";
import Products from "@/app/ui/Products";

export default function Page({
  params,
}: {
  params: Promise<{ urlCategory: string; urlSubCategory: string; id: string }>;
}) {
  const { urlCategory, urlSubCategory } = use(params);
  const messagePromise: Promise<DataProps[]> =
    fetchCategoryPageData(urlCategory); // suspense handles await

  return (
    <article>
      <h1>
        CATEGORY PAGE - {urlCategory} {urlSubCategory}
      </h1>
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <Products messagePromise={messagePromise} />
      </Suspense>
    </article>
  );
}
