import { SxProps } from '@mui/material/styles';
import Box from '@mui/system/Box/Box';

interface LoginFormProps {
  sx?: SxProps;
}

export default function LoginForm({ sx }: LoginFormProps) {
  return (
    <Box sx={{ ...sx }}>
      <h1>Login form</h1>
    </Box>
  );
}
