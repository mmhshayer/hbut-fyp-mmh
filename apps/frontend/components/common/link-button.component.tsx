import Button, { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

interface LinkButtonProps {
  href: string;
  props?: ButtonProps;
}

const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = ({
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
      <Button
        size="small"
        variant="outlined"
        color="primary"
        LinkComponent="a"
        {...props}
      >
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
