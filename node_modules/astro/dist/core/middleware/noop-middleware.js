import { NOOP_MIDDLEWARE_HEADER } from "../constants.js";
const NOOP_MIDDLEWARE_FN = (ctx, next) => {
  ctx.request.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return next();
};
export {
  NOOP_MIDDLEWARE_FN
};
