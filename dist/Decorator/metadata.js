"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => common_1.SetMetadata(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=metadata.js.map