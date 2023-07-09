const path = require("path");
const generateDirectory = require("./index");

const projectPath = __dirname;
// const fileName = "MD.txt";
const fileName = "MD.md";
const outputPath = path.join(projectPath, fileName);
const ignore = ["node_modules", ".git"];
generateDirectory(projectPath, outputPath, ignore);

// generateDirectory();
