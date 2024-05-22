const fs = require('fs')
const path = require('path')

const srcDir = path.join(__dirname, 'src', 'driver')
const distDir = path.join(__dirname, 'dist')

if (!fs.existsSync(distDir)) {
  console.log(`Creating destination directory: ${distDir}`)
  fs.mkdirSync(distDir, { recursive: true })
} else {
  console.log(`Destination directory already exists: ${distDir}`)
}

function copyWasmFiles(src, dest) {
  fs.readdirSync(src).forEach(file => {
    const srcFilePath = path.join(src, file)
    const destFilePath = path.join(dest, file)

    if (fs.lstatSync(srcFilePath).isDirectory()) {
      copyWasmFiles(srcFilePath, dest)
    } else if (path.extname(file) === '.wasm') {
      fs.copyFileSync(srcFilePath, destFilePath)
    }
  })
}

copyWasmFiles(srcDir, distDir)
