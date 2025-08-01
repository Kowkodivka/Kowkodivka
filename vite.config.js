import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "Kowkodivka",
  plugins: [solid(), tailwindcss()],
});
