module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals", "prettier"],
  plugins: ["tailwindcss"],
  parserOptions: {
    project: true,
  },
  rules: {
    "tailwindcss/classnames-order": "warn",
    "@next/next/no-img-element": "off",
  },
};
