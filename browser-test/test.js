describe("@esm-bundle/angular__compiler", () => {
  ["es2015", "es2020"].forEach((ecma) => {
    it(`can load the System.register ${ecma} bundle`, async () => {
      const m = await System.import(
        `/base/system/${ecma}/ivy/angular-compiler.js`
      );
      expect(m.CompilerConfig).toBeDefined();
    });

    it(`can load the System.register ${ecma} prod bundle`, async () => {
      const m = await System.import(
        `/base/system/${ecma}/ivy/angular-compiler.min.js`
      );
      expect(m.CompilerConfig).toBeDefined();
    });
  });
});
