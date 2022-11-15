import { ButtonProps } from '@mui/material/Button';
import { default as MuiLink } from '@mui/material/Link';
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
      }}
      passHref
    >
      <MuiLink sx={{ textAlign: 'center' }}>{children}</MuiLink>
    </Link>
  );
};

export default LinkText;
