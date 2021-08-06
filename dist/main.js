"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const ExceptionFilter_1 = require("./exception/ExceptionFilter");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Nike example')
        .setDescription('The Nike API description')
        .setVersion('1.0')
        .addTag('nike')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalFilters(new ExceptionFilter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map