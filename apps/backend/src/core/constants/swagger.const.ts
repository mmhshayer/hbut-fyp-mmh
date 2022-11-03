import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

// constants
export const TITLE = 'TRAVERN';
export const DESCRIPTION =
  'TRAVERN Multi-Vendor B2B EComm RESTFul API Service Doc.';
export const VERSION = '1.0';
export const TOKEN_NAME = 'access-token';
export const API_DOC_ROUTE = 'api-docs';

// constant objects
export const AUTH_OPTIONS: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'Bearer',
};
