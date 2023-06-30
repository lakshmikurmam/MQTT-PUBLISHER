const fs = require('fs');
const mqtt = require('mqtt');

const topicFileMappings = [
    { topic: 'MC/V1/testing', file: './alaram/agentsTSsub1.json' },
    { topic: 'testing_new', file: './alaram/TS.json' },
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