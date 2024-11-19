// message.js
"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "@/app/ui/image";
import { DataProps } from "../lib/definitions";
import { sentenceCase } from "../lib/utils";
import styles from "@/app/assets/css/Products.module.css";

export default function Products({
  messagePromise,
}: {
  messagePromise: Promise<DataProps[]>;
}) {
  const [hover, setHover] = useState(false);
  const [item, setItem] = useState(0);
  const messageContent: DataProps[] = use(messagePromise);

  const handleHover = (isHover: boolean, modelId: number) => {
    setHover(isHover);
    setItem(modelId);
  };

  return (
    <ul className={styles.list}>
      {messageContent.map((val: DataProps, ind: number) => {
        const { id, name, category, subCategory, price, modelId } = val;
        const link = `${category}/${subCategory}/${id}`.toLowerCase();
        console.log(hover);
        console.log(typeof item);
        console.log(modelId);

        const imageSrc =
          hover && item === modelId ? `${modelId}-2.jpg` : `${modelId}-1.jpg`;

        return (
          <li
            className={styles.listItem}
            key={ind}
            onMouseEnter={() => handleHover(true, modelId)}
            onMouseLeave={() => handleHover(false, 0)}
          >
            <Link href={link}>
              <div className={styles.name}>{sentenceCase(name)}</div>
              <Image
                imgSrc={imageSrc}
                imgAlt={name}
                imgWidth={200}
                imgHeight={200}
              />
              <div className={styles.price}>{price}</div>
              <b className={styles.price}>{modelId}</b>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
