const fs = require('fs');
const mqtt = require('mqtt');
const path = require('path');
// Relative file paths within the container
const relativeFilePath1 = './alaram/agentsTSsub1.json';
const relativeFilePath2 = './alaram/TS.json';
const absoluteFilePath1 = path.join(__dirname, relativeFilePath1);
const absoluteFilePath2 = path.join(__dirname, relativeFilePath2);
const topicFileMappings = [
    { topic: 'MC/V1/testing', file: absoluteFilePath1 },
    { topic: 'testing_new', file: absoluteFilePath2 },
];

const client = mqtt.connect('mqtt://test.mosquitto.org:1883'); // Replace with your MQTT broker URL

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
        });
    });
});