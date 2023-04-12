import Header from './header/Header';

export default function DefaultView({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
