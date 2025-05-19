import Header from "./Header";
import Dock from "./dock";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Dock />
    </>
  );
}
