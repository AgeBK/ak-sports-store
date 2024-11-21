import Link from "next/link";
import { sentenceCase } from "../lib/utils";
import { usePathname } from "next/navigation";
import { CrumbProps } from "../lib/definitions";
import Nav from "./nav";
import BreadCrumb from "./bread-crumb";
import styles from "@/app/assets/css/Header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <Nav />
      <BreadCrumb />
    </header>
  );
}
