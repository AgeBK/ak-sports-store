import Link from "next/link";
import Image from "@/app/ui/image";
import Nav from "./nav";
import BreadCrumb from "./bread-crumb";
import styles from "@/app/assets/css/Header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.ak}>
            <Link href="/">
              <Image
                imgSrc="AK.webp"
                imgAlt="AK Sports Store"
                imgWidth={80}
                imgHeight={50}
              />
            </Link>
          </div>
          <span
            className={`${styles.underlined} ${styles.ulineOver} ${styles.akText}`}
          >
            Sports Shoes
          </span>
        </div>
        <Nav />
      </div>
      <BreadCrumb />
    </header>
  );
}
