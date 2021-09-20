import Header from 'components/common/Header';

export default function DefaultView({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
