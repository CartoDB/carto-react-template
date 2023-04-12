import Header from 'components/common/header/Header';

export default function DefaultView({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
