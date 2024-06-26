describe("@esm-bundle/angular__compiler", () => {
  ["es2022"].forEach((ecma) => {
    it(`can load the System.register ${ecma} bundle`, async () => {
      const m = await System.import(`/base/system/${ecma}/angular-compiler.js`);
      expect(m.CompilerConfig).toBeDefined();
    });

    it(`can load the System.register ${ecma} prod bundle`, async () => {
      const m = await System.import(
        `/base/system/${ecma}/angular-compiler.min.js`,
      );
      expect(m.CompilerConfig).toBeDefined();
    });
  });
});
