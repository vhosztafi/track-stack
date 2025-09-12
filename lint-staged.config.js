import path from "path";

/** @type {import("lint-staged").Config} */
export const config = {
  "*.{js,jsx,ts,tsx}": (filenames) => {
    const files = filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" --file ");
    return [`npm run format -- --write`, `npm run lint:fix -- --file ${files}`];
  },
  "!(*.{js,jsx,ts,tsx})": ["npm run format -- --write"],
};
