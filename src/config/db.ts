// Attempt to load PrismaClient dynamically so that the project
// can show a clear error when @prisma/client is not installed.
declare const require: any;

let PrismaClient: any;
try {
	// Use require to avoid TypeScript compile-time error if the package is missing.
	PrismaClient = require("@prisma/client").PrismaClient;
} catch (err) {
	throw new Error("Cannot find module '@prisma/client'. Install it with `npm install @prisma/client` and run `npx prisma generate`.");
}

export const prisma = new PrismaClient();