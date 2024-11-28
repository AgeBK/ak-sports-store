import { currency } from "../lib/utils";
import styles from "@/app/assets/css/Price.module.css";

export default function Price({
  price,
  priceBeforeDiscount,
  percentage,
  css,
}: {
  price: number;
  priceBeforeDiscount: number;
  percentage: number;
  css: string;
}) {
  const priceTag = <strong className={styles.price}>{currency(price)}</strong>;
  const beforeTag = (
    <div className={css ? styles[css] : ""}>
      <span className={styles.was}>Was</span>
      <span className={styles.priceBefore}>
        {currency(priceBeforeDiscount)}
      </span>
      <span className={styles.percentage}>{percentage} % off</span>
    </div>
  );
  const discountTag = (
    <div className={css ? styles[css] : ""}>
      {priceTag} {beforeTag}
    </div>
  );

  return percentage ? discountTag : priceTag;
}
