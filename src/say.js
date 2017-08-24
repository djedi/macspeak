const exec = require('child_process').exec;
const rexec = require('ssh-exec');

let originalVolume = 0;

function say(words) {
    let cinfo = getConnectionInfo();
    let voice = document.getElementById('voice').value;
    let volume = document.getElementById('volume').value;

    let cmd = `osascript -e "set Volume ${volume / 10}" && say -v "${voice}" "${words}"`;

    if (cinfo.user) {
        rexec(cmd, cinfo);
    } else {
        exec(cmd);
    }
}

function getConnectionInfo() {
    let connectionInfo = {
        host: '127.0.0.1',
    };
    let user = document.getElementById('username').value;
    if (user) {
        connectionInfo['user'] = user;
    }
    let host = document.getElementById('host').value;
    if (host) {
        connectionInfo['host'] = host;
    }
    let password = document.getElementById('password').value;
    if (password) {
        connectionInfo['password'] = password;
    }

    return connectionInfo;
}

function testConnection() {
    let cinfo = getConnectionInfo();
    rexec('uname', cinfo, (err, stdout, stderr) => {
        console.debug('[err]', err);
        console.debug('[stdout]', stdout);
        console.debug('[stderr]', stderr);
        if (stdout) {
            alert('Connection successful');
        }
    });
}

function getVolume() {
    output = rexec(
        "osascript -e 'set ovol to output volume of (get volume settings)'",
        rsettings,
        (err, stdout) => {
            originalVolume = stdout;
        }
    );
}

function sayWords() {
    let words = document.getElementById('words').value;
    if (words) {
        say(words);
    } else {
        say('What would you like to say?');
    }
}
