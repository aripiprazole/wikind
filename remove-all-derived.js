let fs = require('fs');
let path = require('path');

function f(dir) {
  for (const x of fs.readdirSync(dir)) {
    let p = path.join(dir, x);
    if (fs.statSync(p).isDirectory()) {
      f(p);
    } else {
      let file = fs.readFileSync(p, 'utf8');
      let lines = file.split('\n');
      if (!x.endsWith('_.kind2')) {
        if (lines) {
          if (lines[0].startsWith('// Automatically derived from')) {
            fs.unlinkSync(p);
          }
        }
      }
    }
  }
}

f('.');
