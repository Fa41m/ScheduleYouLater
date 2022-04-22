// // Calling python function in javascript
// // Run by doing node email.js
// const {spawn} = require('child_process');

// // const childPython = spawn('python', ['email-notif.py']);
// // const childPython = spawn('python', ['email-notif.py', <email title>, <email body>]);
// const childPython = spawn('python', ['email-notif.py', "Meeting today!", "Hey bro you have a meeting today!","Fabrar1738@gmail.com"]);
// childPython.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });
// // Outputs if there is an error
// childPython.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
// });
// childPython.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// });

// Creating it as a Function
function emailNotif(title, message, email) {
    const {spawn} = require('child_process');

    // const childPython = spawn('python', ['email-notif.py']);
    // const childPython = spawn('python', ['email-notif.py', <email title>, <email body>]);
    const childPython = spawn('python', ['email-notif.py',title, message, email]);
    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    // Outputs if there is an error
    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

emailNotif("Deadline!", "Bing bong!","Fabrar1738@gmail.com")
// module.export={emailNotif};