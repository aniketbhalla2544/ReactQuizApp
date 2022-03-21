import Link from 'next/link';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <section className='flex items-center justify-between bg-neutral-800 px-4 py-7 text-white shadow-xl lg:px-8 lg:py-6'>
      <Link href='/'>
        <a className='text-2xl font-semibold capitalize'>react quiz app</a>
      </Link>
      <main>{children}</main>
    </section>
  );
};

export default Header;
