const fs = require('fs');
const mqtt = require('mqtt');
const path = require('path');
const username = 'gepc-producer';
const password = '26afc6e1';
const clientId = '95cb7981-3d4c-4b35-aff0-73d5150be1be';
const host = '10.246.0.10:1883';
let messageCount = 0;
const topic = 'MC/V1/testing';
const MQTT_QOS = 1;
// Relative file paths within the container
const relativeFilePath1 = './alaram/agentsTSsub1.json';
//const relativeFilePath2 = './alaram/TS.json';
const absoluteFilePath1 = path.join(__dirname, relativeFilePath1);
const absoluteFilePath2 = path.join(__dirname, relativeFilePath2);
const topicFileMappings = [
    { topic: 'MC/V1/testing', file: absoluteFilePath1 },
    // { topic: 'testing_new', file: absoluteFilePath2 },
    // { topic: 'MC/V1/testing', file: absoluteFilePath2 },
];
//Local Test
//const client1 = mqtt.connect('mqtt://test.mosquitto.org:1883'); // Replace with your MQTT broker URL
const client = mqtt.connect(`mqtt://${username}:${password}@${host}`, {
    clientId,
    clean: true,
    rejectUnauthorized: false
});


client.on('connect', () => {
    topicFileMappings.forEach(mapping => {
        const { topic, file } = mapping;
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // Publish the file contents to the corresponding topic
            client.publish(topic, data);

            console.log(`Published file contents to topic ${topic}`);
            client.end(); // Disconnect from the MQTT broker after publishing

        });

    });


});