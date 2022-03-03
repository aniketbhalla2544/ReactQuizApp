import Link from 'next/link';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <section className='bg-neutral-800 px-8 py-6 text-white flex justify-between items-center'>
      <Link href='/'>
        <a className='capitalize font-semibold text-2xl'>react quiz app</a>
      </Link>
      <main>{children}</main>
    </section>
  );
};

export default Header;
