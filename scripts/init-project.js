import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [projectName] = process.argv.slice(2);
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'new-sketch-template');
const destDir = path.join(rootDir, 'src', projectName);
console.log(srcDir, destDir);

if (fse.existsSync(destDir)) {
    console.log(`Directory with project "${projectName}" already exists`);
} else {
    try {
        fse.copySync(srcDir, destDir);
        console.log(
            `Directory with project "${projectName}" created successfully`
        );
    } catch (e) {
        console.error('Failed to create new project');
        console.log(e);
    }
}
