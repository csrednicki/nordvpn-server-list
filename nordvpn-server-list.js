const https = require('https');

https.get('https://zwyr157wwiu6eior.com/server', (response) => {
    let body = '';

    response.on('data', function (d) {
        body += d;
    });

    response.on('end', function () {

        let serverList = [];
        let parsed = '';

        try {
            parsed = JSON.parse(body);
            serverList = getServers(parsed);
        } catch (e) {
            console.error("Error! Servers list should be in JSON format but it isn't");
        }

        serverList.forEach(function (server) {
            process.stdout.write(server + "\n");
        }, this);

    });

}).on('error', (e) => {
    console.error(e);
});

function getServers(data) {
    let servers = [];

    data.forEach(function (element) {

        if (element.domain !== '') {
            servers.push(element.domain);
        }

    }, this);

    servers.sort();

    return servers;
}