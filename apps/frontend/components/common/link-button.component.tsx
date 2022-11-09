import Button, { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

interface LinkButtonProps {
  href: string;
  buttonProps?: ButtonProps;
}

const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = ({
  href,
  buttonProps,
  children,
}) => {
  return (
    <Link href={href} passHref>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        LinkComponent="a"
        {...buttonProps}
      >
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
