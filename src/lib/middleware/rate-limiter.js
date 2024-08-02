import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max requests
  message: 'API rate limit exceeded. Too many requests. Please try again later.'
});

export default limiter;
