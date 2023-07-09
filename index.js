const fs = require("fs");
const path = require("path");

function generateDirectory(
  projectPath = __dirname,
  outputPath = path.join(projectPath, "MD.md"),
  ignore = ["node_modules", ".git", "dist", ".vscode", ".github"]
) {
  let output = "";

  function walkDir(dir, depth = 0, last = []) {
    const files = fs.readdirSync(dir).filter((file) => !ignore.includes(file));
    files.forEach((file, index) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const isLast = index === files.length - 1;
      if (stat.isDirectory()) {
        // 如果当前文件是目录
        if (outputPath.endsWith(".txt")) {
          // 如果输出文件是 .txt 格式，则使用树形结构展示目录
          const indent = last
            .map((isLast) => (isLast ? "    " : "│   "))
            .join("");
          output += `${indent}${isLast ? "└─" : "├─"} ${file}\n`;
          walkDir(filePath, depth + 1, [...last, isLast]);
        } else {
          // 如果输出文件是 .md 格式，则使用列表展示目录
          output += `${"  ".repeat(depth)}- ${file}\n`;
          walkDir(filePath, depth + 1);
        }
      } else {
        // 如果当前文件不是目录
        if (outputPath.endsWith(".txt")) {
          // 如果输出文件是 .txt 格式，则使用树形结构展示文件
          const indent = last
            .map((isLast) => (isLast ? "    " : "│   "))
            .join("");
          output += `${indent}${isLast ? "└─" : "├─"} ${file}\n`;
        } else {
          // 如果输出文件是 .md 格式，则使用链接展示文件
          const relativePath = path.relative(projectPath, filePath);
          output += `${"  ".repeat(depth)}- [${file}](${relativePath})\n`;
        }
      }
    });
  }

  walkDir(projectPath);

  fs.writeFileSync(outputPath, output);
}

module.exports = generateDirectory;
