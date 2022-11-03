import {
  API_DOC_ROUTE,
  AUTH_OPTIONS,
  DESCRIPTION,
  TITLE,
  TOKEN_NAME,
  VERSION,
} from '../core/constants/swagger.const';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 *  Swagger Config Setup in the application
 * @param app {INestApplication}
 */

const configSwagger = (app: INestApplication) => {
  const OPTIONS = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(VERSION)
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .build();

  const DOCUMENT = SwaggerModule.createDocument(app, OPTIONS);

  SwaggerModule.setup(API_DOC_ROUTE, app, DOCUMENT);
};

export default configSwagger;
