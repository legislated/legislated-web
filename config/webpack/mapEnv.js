// make sure NODE_ENV is one of webpacker's three bless-ed envs
const env = process.env.NODE_ENV || 'development'
process.env.NODE_ENV = env
