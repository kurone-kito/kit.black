export default {
  plugins: { autoprefixer: {}, tailwindcss: {} },
  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
};
