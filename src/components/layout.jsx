import Dock from "./dock";

export default function Layout({ children }) {
  return (
    <>
      <main className='main'>{children}</main>
      <Dock />
    </>
  );
}
