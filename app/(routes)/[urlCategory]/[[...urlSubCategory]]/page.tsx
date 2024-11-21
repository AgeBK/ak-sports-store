import { Suspense, use } from "react";
import { fetchCategoryPageData } from "@/app/lib/utils";
import { DataProps } from "@/app/lib/definitions";
import { sentenceCase } from "@/app/lib/utils";
import Products from "@/app/ui/Products";

export default function Page({
  params,
}: {
  params: Promise<{ urlCategory: string; urlSubCategory: string; id: string }>;
}) {
  const { urlCategory, urlSubCategory } = use(params);
  const data: Promise<DataProps[]> = fetchCategoryPageData(
    urlCategory,
    urlSubCategory
  ); // suspense handles await

  return (
    <article>
      <h2>
        {sentenceCase(urlCategory)} {sentenceCase(urlSubCategory)}
      </h2>
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <Products data={data} />
      </Suspense>
    </article>
  );
}
