import Header from "../header";
import Footer from "../footer";
import styles from "@/app/assets/css/Container.module.css";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
