#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const build_optimizer_1 = require("./build-optimizer");
if (process.argv.length < 3 || process.argv.length > 4) {
    throw new Error(`
    build-optimizer should be called with either one or two arguments:

      build-optimizer input.js
      build-optimizer input.js output.js
  `);
}
const currentDir = process.cwd();
const inputFile = process.argv[2];
const tsOrJsRegExp = /\.(j|t)s$/;
if (!inputFile.match(tsOrJsRegExp)) {
    throw new Error(`Input file must be .js or .ts.`);
}
// Use provided output file, or add the .bo suffix before the extension.
const outputFile = process.argv[3] || inputFile.replace(tsOrJsRegExp, (subStr) => `.bo${subStr}`);
const boOutput = build_optimizer_1.buildOptimizer({
    inputFilePath: path_1.join(currentDir, inputFile),
    outputFilePath: path_1.join(currentDir, outputFile),
    emitSourceMap: true,
});
if (boOutput.emitSkipped) {
    console.log('Nothing to emit.');
}
else {
    fs_1.writeFileSync(path_1.join(currentDir, outputFile), boOutput.content);
    fs_1.writeFileSync(path_1.join(currentDir, `${outputFile}.map`), JSON.stringify(boOutput.sourceMap));
    console.log('Emitted:');
    console.log(`  ${outputFile}`);
    console.log(`  ${outputFile}.map`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9vcHRpbWl6ZXIvc3JjL2J1aWxkLW9wdGltaXplci9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsMkJBQW1DO0FBQ25DLCtCQUE0QjtBQUM1Qix1REFBbUQ7QUFHbkQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUM7Ozs7O0dBS2YsQ0FBQyxDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFakMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUM7QUFFakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7SUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0NBQ25EO0FBRUQsd0VBQXdFO0FBQ3hFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVsRyxNQUFNLFFBQVEsR0FBRyxnQ0FBYyxDQUFDO0lBQzlCLGFBQWEsRUFBRSxXQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztJQUMxQyxjQUFjLEVBQUUsV0FBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7SUFDNUMsYUFBYSxFQUFFLElBQUk7Q0FDcEIsQ0FBQyxDQUFDO0FBRUgsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztDQUNqQztLQUFNO0lBQ0wsa0JBQWEsQ0FBQyxXQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5RCxrQkFBYSxDQUFDLFdBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxVQUFVLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDekYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxNQUFNLENBQUMsQ0FBQztDQUNwQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IHdyaXRlRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBidWlsZE9wdGltaXplciB9IGZyb20gJy4vYnVpbGQtb3B0aW1pemVyJztcblxuXG5pZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA8IDMgfHwgcHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDQpIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICBidWlsZC1vcHRpbWl6ZXIgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIGVpdGhlciBvbmUgb3IgdHdvIGFyZ3VtZW50czpcblxuICAgICAgYnVpbGQtb3B0aW1pemVyIGlucHV0LmpzXG4gICAgICBidWlsZC1vcHRpbWl6ZXIgaW5wdXQuanMgb3V0cHV0LmpzXG4gIGApO1xufVxuXG5jb25zdCBjdXJyZW50RGlyID0gcHJvY2Vzcy5jd2QoKTtcblxuY29uc3QgaW5wdXRGaWxlID0gcHJvY2Vzcy5hcmd2WzJdO1xuY29uc3QgdHNPckpzUmVnRXhwID0gL1xcLihqfHQpcyQvO1xuXG5pZiAoIWlucHV0RmlsZS5tYXRjaCh0c09ySnNSZWdFeHApKSB7XG4gIHRocm93IG5ldyBFcnJvcihgSW5wdXQgZmlsZSBtdXN0IGJlIC5qcyBvciAudHMuYCk7XG59XG5cbi8vIFVzZSBwcm92aWRlZCBvdXRwdXQgZmlsZSwgb3IgYWRkIHRoZSAuYm8gc3VmZml4IGJlZm9yZSB0aGUgZXh0ZW5zaW9uLlxuY29uc3Qgb3V0cHV0RmlsZSA9IHByb2Nlc3MuYXJndlszXSB8fCBpbnB1dEZpbGUucmVwbGFjZSh0c09ySnNSZWdFeHAsIChzdWJTdHIpID0+IGAuYm8ke3N1YlN0cn1gKTtcblxuY29uc3QgYm9PdXRwdXQgPSBidWlsZE9wdGltaXplcih7XG4gIGlucHV0RmlsZVBhdGg6IGpvaW4oY3VycmVudERpciwgaW5wdXRGaWxlKSxcbiAgb3V0cHV0RmlsZVBhdGg6IGpvaW4oY3VycmVudERpciwgb3V0cHV0RmlsZSksXG4gIGVtaXRTb3VyY2VNYXA6IHRydWUsXG59KTtcblxuaWYgKGJvT3V0cHV0LmVtaXRTa2lwcGVkKSB7XG4gIGNvbnNvbGUubG9nKCdOb3RoaW5nIHRvIGVtaXQuJyk7XG59IGVsc2Uge1xuICB3cml0ZUZpbGVTeW5jKGpvaW4oY3VycmVudERpciwgb3V0cHV0RmlsZSksIGJvT3V0cHV0LmNvbnRlbnQpO1xuICB3cml0ZUZpbGVTeW5jKGpvaW4oY3VycmVudERpciwgYCR7b3V0cHV0RmlsZX0ubWFwYCksIEpTT04uc3RyaW5naWZ5KGJvT3V0cHV0LnNvdXJjZU1hcCkpO1xuICBjb25zb2xlLmxvZygnRW1pdHRlZDonKTtcbiAgY29uc29sZS5sb2coYCAgJHtvdXRwdXRGaWxlfWApO1xuICBjb25zb2xlLmxvZyhgICAke291dHB1dEZpbGV9Lm1hcGApO1xufVxuIl19