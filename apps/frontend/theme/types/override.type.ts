import { Components, Theme } from '@mui/material/styles';

export type StyleOverrides = Components<Omit<Theme, 'components'>>;
