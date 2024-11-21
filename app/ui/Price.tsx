import { currency } from "../lib/utils";
import styles from "@/app/assets/css/Price.module.css";

export default function Price({
  price,
  priceBeforeDiscount,
  percentage,
}: {
  price: number;
  priceBeforeDiscount: number;
  percentage: number;
}) {
  const priceTag = <strong className={styles.price}>{currency(price)}</strong>;
  const beforeTag = (
    <>
      <span className={styles.was}>Was</span>
      <span className={styles.priceBefore}>
        {currency(priceBeforeDiscount)}
      </span>
      <span className={styles.percentage}>{percentage} % off</span>
    </>
  );
  const discountTag = (
    <>
      {priceTag} {beforeTag}
    </>
  );

  return percentage ? discountTag : priceTag;
}
