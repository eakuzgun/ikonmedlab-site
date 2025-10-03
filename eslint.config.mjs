import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js ve TypeScript kurallarını extend et
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // ignore edilmesi gereken dosya ve klasörler
    files: ["**/*.{ts,tsx,js,jsx}"], // dosya kapsamını belirle
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // kendi özel kurallarını buraya ekleyebilirsin
    },
  },
];

export default eslintConfig;
