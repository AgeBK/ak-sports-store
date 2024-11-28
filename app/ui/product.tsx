"use client";

import { use, useState } from "react";
import Image from "@/app/ui/image";
import Price from "./price";
import { DataProps } from "../lib/definitions";
import { sentenceCase } from "../lib/utils";
import appData from "../lib/appData.json";
import styles from "@/app/assets/css/Product.module.css";

export default function Product({ promise }: { promise: Promise<DataProps> }) {
  const [shoeSize, setShoeSize] = useState(0);
  const data: DataProps = use(promise);
  const { shoeSizes } = appData;

  const {
    modelId,
    name,
    brand,
    available,
    catchLine,
    colour,
    components,
    designFor,
    gender,
    productNature,
    price,
    priceBeforeDiscount,
    percentage,
    size,
    sport,
  } = data;

  const handleShoeSize = (val: number) =>
    shoeSize === val ? setShoeSize(0) : setShoeSize(val);

  return (
    <div className={styles.container}>
      <h2 className={styles.name}>{sentenceCase(name)}</h2>
      <div className={styles.info}>{catchLine}</div>
      <div className={styles.info}>{designFor}</div>
      <div className={styles.images}>
        <div className={styles.image}>
          <Image
            imgSrc={`${modelId}-1.webp`}
            imgAlt={name}
            imgWidth={400}
            imgHeight={400}
          />
        </div>
        <div className={styles.image}>
          <Image
            imgSrc={`${modelId}-2.webp`}
            imgAlt={name}
            imgWidth={400}
            imgHeight={400}
          />
        </div>
      </div>
      {/* <div className={styles.colour}>
        <b>Colour: {colour}</b>
      </div> */}

      <div className={styles.costSize}>
        <div className={styles.cost}>
          <Price
            price={price}
            priceBeforeDiscount={priceBeforeDiscount}
            percentage={percentage}
            css="product"
          />
        </div>
        <div className={styles.size}>
          <h3 className={styles.hdr}>Sizes</h3>

          {shoeSizes.map((val: number) => {
            const available = size.indexOf(val) > -1;
            return (
              <button
                className={`${styles.shoeSizes} ${
                  available ? styles.available : styles.strike
                }  ${shoeSize === val ? styles.selected : ""}`}
                key={val}
                onClick={() => handleShoeSize(val)}
                disabled={!available}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.detailsCont}>
        <h3 className={styles.hdr}>Product Details</h3>
        <span>{components}</span>
      </div>

      <div className={styles.detailsCont}>
        <h3 className={styles.hdr}>Product Details</h3>
        <ul className={styles.details}>
          <li className={styles.info}>
            <b>Brand:</b> <span>{sentenceCase(brand)}</span>
          </li>
          <li className={styles.info}>
            <b>Sport:</b> <span>{sentenceCase(sport.join(", "))}</span>
          </li>
          <li className={styles.info}>
            <b>Gender:</b> <span>{sentenceCase(gender.join(", "))}</span>
          </li>
          <li className={styles.info}>
            <b>Product Nature:</b> <span>{sentenceCase(productNature)}</span>
          </li>
          <li className={styles.info}>
            <b>Available:</b>
            <span> {available ? "Available" : "Out of stock"}</span>
          </li>
          {colour && (
            <li className={styles.info}>
              <b>Colour:</b> <span> {sentenceCase(colour)}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
