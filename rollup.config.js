import fs from "fs";
import url from "url";
import path from "path";
import terser from "@rollup/plugin-terser";

const __dirname = new url.URL(".", import.meta.url).pathname;
const packageJson = JSON.parse(
  fs
    .readFileSync(
      path.resolve(__dirname, "node_modules/@angular/compiler/package.json"),
    )
    .toString(),
);

export default [
  ...["2022"]
    .map((ecma) => [
      createConfig({ ecma, prod: false, format: "system" }),
      createConfig({ ecma, prod: true, format: "system" }),
      createConfig({ ecma, prod: false, format: "es" }),
      createConfig({ ecma, prod: true, format: "es" }),
    ])
    .flat(),
];

function createConfig({ ecma, prod, format }) {
  const dir = (format === "es" ? "." : format) + `/es${ecma}/ivy`;

  return {
    input: path.join(
      __dirname,
      `node_modules/@angular/compiler/fesm${ecma}/compiler.mjs`,
    ),
    output: {
      file: `${dir}/angular-compiler.${prod ? "min." : ""}js`,
      format,
      sourcemap: true,
      banner: `/* esm-bundle - @angular/compiler@${packageJson.version} - Ivy - ${format} format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */`,
    },
    plugins: [
      prod &&
        terser({
          format: {
            ecma,
            comments: /esm-bundle/,
          },
          compress: {
            global_defs: {
              ngJitMode: false,
              ngDevMode: false,
              ngI18nClosureMode: false,
            },
          },
        }),
    ],
    external: ["rxjs", "rxjs/operators"],
  };
}
