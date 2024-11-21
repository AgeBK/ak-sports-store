"use client";

import { useState } from "react";
import Link from "next/link";
import data from "@/app/lib/appData.json";
import styles from "@/app/assets/css/Nav.module.css";

export default function Nav() {
  const [isHover, setIsHover] = useState(false);
  const [index, setIndex] = useState(-1);
  const { navSubItems } = data;

  const handleHover = (index: number, isHover: boolean) => {
    setIsHover(isHover);
    setIndex(index);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {Object.entries(navSubItems).map(([key, value], ind) => {
            return (
              <li
                className={styles.navItem}
                key={ind}
                onMouseEnter={() => handleHover(ind, true)}
                onMouseLeave={() => handleHover(-1, false)}
              >
                <Link href={`/${key.toLowerCase()}`}>
                  <b>{key}</b>
                </Link>
                <ul
                  className={`${styles.subNav} ${styles["subNav" + ind]} ${
                    isHover && ind === index ? styles.block : styles.none
                  }`}
                  key={key + ind}
                >
                  {value.map((val: string, index: number) => (
                    <li className={styles.subNavItem} key={val + index}>
                      <Link href={`/${key.toLowerCase()}/${val.toLowerCase()}`}>
                        {val}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
