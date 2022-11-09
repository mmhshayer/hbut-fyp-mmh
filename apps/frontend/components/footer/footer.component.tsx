import Typography from '@mui/material/Typography/Typography';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Something here to give the footer a purpose!
      </Typography>
    </footer>
  );
};

export default Footer;
