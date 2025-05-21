import Dock from "./dock";

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Dock />
    </>
  );
}
