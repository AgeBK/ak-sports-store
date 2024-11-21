import Link from "next/link";
import { sentenceCase } from "../lib/utils";
import { usePathname } from "next/navigation";
import { CrumbProps } from "../lib/definitions";
import styles from "@/app/assets/css/footer.module.css";

export default function Footer() {
  return <div className={styles.footer}>Footer</div>;
}
