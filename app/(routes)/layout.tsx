// import Container from "../ui/container/container";
import Nav from "../ui/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}