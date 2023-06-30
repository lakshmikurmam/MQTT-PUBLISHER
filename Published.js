const fs = require('fs');
const mqtt = require('mqtt');

const mqttBrokerUrl = 'mqtt://test.mosquitto.org:1883';

// Create an MQTT client
const mqttClient = mqtt.connect(mqttBrokerUrl);
//added when it pushed docker
const data1 = require('/app11/MQTT-PUBLISHER/alaram/agentsTSsub1.json')
const data2 = require('/app11/MQTT-PUBLISHER/alaram/TS.json')
fs.readFile(data1, data2, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
});
console.log(data)
    //For Docker Conatner
    // Define topic-file mappings
const topicFileMappings = [
    //Local Testing
    //{ topic: 'MC/V1/testing', file: './alaram/agentsTSsub1.json' },
    // { topic: 'testing_new', file: './alaram/TS.json' },
    { topic: 'MC/V1/testing', file: 'data1' },
    { topic: 'testing_new', file: 'data2' },

];

// Function to publish JSON data via MQTT
function publishJSONData(topic, jsonData) {
    // Publish the JSON data as an MQTT message
    mqttClient.publish(topic, JSON.stringify(jsonData), (err) => {
        if (err) {
            console.error(`Error publishing message to topic ${topic}:`, err);
        } else {
            console.log(`Published message to topic ${topic}`);
        }
    });
}

// Subscribe to MQTT broker
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Read each JSON file and publish the contents to the respective topics
    topicFileMappings.forEach(({ topic, file }) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    publishJSONData(topic, jsonData);
                } catch (error) {
                    console.error(`Error parsing JSON in file ${file}:`, error);
                }
            }
        });
    });
});

mqttClient.on('close', () => {
    console.log('Disconnected from MQTT broker');
});