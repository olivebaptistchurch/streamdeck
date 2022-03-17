let net = require('net');

const args = process.argv.slice(2);

const HOST = '10.50.10.146';
const PORT = 1023;

// The values below are hexadecimal and generated from audio architect

let commandBytes = {
        'presetFOH': '028C000000008C03',
        'presetAppleTV': '028C000000018D03',
        'presetBT': '028C0000001B828E03',
        'presetLocal': '028C0000001B838F03',
        'volumeUpInside': '029000011B830001080000000A00009103',
        'volumeDownInside': '029000011B830001080000FFF600009203',
        'muteInside': '028800011B830001080001000000018303',
        'unmuteInside': '028800011B830001080001000000008203'
    }

let presetChoice = Buffer.from(commandBytes[args[0]], 'hex');

let client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log(`Connected to: ${HOST}:${PORT}`);
    client.write(presetChoice);
    client.destroy();
})

client.on('close', () => {
    console.log('Connection closed');
})