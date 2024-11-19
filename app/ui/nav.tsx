import Link from "next/link";
import styles from "@/app/assets/css/Nav.module.css";
import data from "@/app/lib/appData.json";

export default function Nav() {
  const { navItems } = data;

  return (
    <div className={styles.container}>
      <nav>
        <ul className={styles.nav}>
          {navItems.map((val) => (
            <li className={styles.navItem} key={val}>
              <Link href={`/${val.toLowerCase()}`}>{val}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
