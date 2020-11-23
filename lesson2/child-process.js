const {spawn, fork, exec, execFile} = require('child_process');

const ps = spawn('ps', ['ax'], {stdio: 'pipe'});
const grep = spawn('grep', ['ssh'], {stdio: 'pipe'});

ps.stdout.on('data', data => {
    grep.stdin.write(data);
});

grep.stdout.on('data', data => {
    /* eslint-disable no-console */
    console.log('data', data.toString());
    /* eslint-enable no-console */
});
