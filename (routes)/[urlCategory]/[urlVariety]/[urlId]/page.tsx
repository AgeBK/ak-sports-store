import React from 'react';
import { notFound } from 'next/navigation';
import { fetchProductById } from '@/app/lib/data';
import BreadCrumb from '@/app/ui/product/product-bread-crumb';
import ProductCart from '@/app/ui/product/product-cart';
import ProductDetails from '@/app/ui/product/product-details';
import ProductInfo from '@/app/ui/product/product-info';
import ProductReview from '@/app/ui/product/product-review';
import CarouselMain from '@/app/ui/carousel/carousel-main';
import styles from '@/app/assets/css/product/Product.module.css';

export default async function Product({
  params: { urlCategory, urlVariety, urlId },
}: {
  params: { urlCategory: string; urlVariety: string; urlId: string };
}) {
  const product = await fetchProductById(urlId);

  if (product) {
    const {
      id,
      category,
      variety,
      name,
      shortName,
      brand,
      packaging,
      ratingsAverage,
      ratingsTotal,
      region,
      priceNormal,
      priceTenFor,
      priceTwoFor,
      priceCurrent,
      pricePercentOff,
      promotionCalloutText,
      promotionDiscountCode,
      unitOfMeasureLabel,
    } = product;

    const isCask = packaging === 'Cask';

    return (
      <article>
        <div className={styles.container}>
          <BreadCrumb
            urlCategory={urlCategory}
            urlVariety={urlVariety}
            category={category}
            variety={variety}
          />
          <ProductDetails
            id={id}
            name={name}
            shortName={shortName}
            brand={brand}
            packaging={packaging}
            priceCurrent={priceCurrent}
            priceTwoFor={priceTwoFor}
            priceTenFor={priceTenFor}
            pricePercentOff={pricePercentOff}
            promotionCalloutText={promotionCalloutText}
            promotionDiscountCode={promotionDiscountCode}
            average={ratingsAverage}
            total={ratingsTotal}
            urlCategory={urlCategory}
            urlVariety={urlVariety}
            isCask={isCask}
          />
          <div className={styles.cartCont}>
            <ProductCart
              id={id}
              name={name}
              brand={brand}
              shortName={shortName}
              priceCurrent={priceCurrent}
              priceTwoFor={priceTwoFor}
              priceTenFor={priceTenFor}
              pricePercentOff={pricePercentOff}
              packaging={packaging}
              promotionCalloutText={promotionCalloutText}
              promotionDiscountCode={promotionDiscountCode}
              isCask={isCask}
            />
          </div>
          <ProductInfo
            id={id}
            category={category}
            variety={variety}
            brand={brand}
            packaging={packaging}
            region={region}
            unitOfMeasureLabel={unitOfMeasureLabel}
            current={priceCurrent}
            normal={priceNormal}
            shortName={shortName}
            urlCategory={urlCategory}
          />
          <ProductReview urlCategory={urlCategory} variety={variety} />
          <section className={styles.similar}>
            <h2>Similar Products:</h2>
            <CarouselMain variety={variety} />
          </section>
        </div>
      </article>
    );
  }
  notFound();
}
