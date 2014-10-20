var bin = require('./').bin;

bin.run(['--version'], function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('atom-shell downloaded successfully!');
});
