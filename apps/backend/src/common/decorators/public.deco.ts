import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../../core/constants/auth.const';

export const PublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true);
