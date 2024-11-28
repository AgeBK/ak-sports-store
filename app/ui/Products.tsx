"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "@/app/ui/image";
import Price from "./price";
import { DataProps } from "../lib/definitions";
import { sentenceCase } from "../lib/utils";
import styles from "@/app/assets/css/Products.module.css";

export default function Products({
  promise,
}: {
  promise: Promise<DataProps[]>;
}) {
  const [hover, setHover] = useState(false);
  const [item, setItem] = useState(0);
  const messageContent: DataProps[] = use(promise);

  // const handleHover = (isHover: boolean, modelId: number) => {
  //   setHover(isHover);
  //   setItem(modelId);
  // };

  return (
    <ul className={styles.list}>
      {messageContent.map((val: DataProps, ind: number) => {
        const {
          id,
          name,
          category,
          subCategory,
          price,
          priceBeforeDiscount,
          percentage,
          modelId,
        } = val;
        const link = `/${category}/${subCategory}/${id}`.toLowerCase();
        const imageSrc =
          hover && item === modelId ? `${modelId}-2.webp` : `${modelId}-1.webp`;
        return (
          <li
            className={styles.listItem}
            key={ind}
            // onMouseEnter={() => handleHover(true, modelId)}
            // onMouseLeave={() => handleHover(false, 0)}
          >
            <Link href={link}>
              <h3 className={styles.name}>{sentenceCase(name)}</h3>
              <Image
                imgSrc={imageSrc}
                imgAlt={name}
                imgWidth={200}
                imgHeight={200}
              />
              <Price
                price={price}
                priceBeforeDiscount={priceBeforeDiscount}
                percentage={percentage}
                css="Products"
              />
            </Link>
            <div>{modelId}</div>
          </li>
        );
      })}
    </ul>
  );
}
