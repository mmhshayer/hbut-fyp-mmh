import { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

interface LinkTextProps {
  href: string;
  props?: ButtonProps;
}

const LinkText: FC<PropsWithChildren<LinkTextProps>> = ({
  href,
  props,
  children,
}) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
      passHref
    >
      <p>
        {children}
      </p>
    </Link>
  );
};

export default LinkText;
