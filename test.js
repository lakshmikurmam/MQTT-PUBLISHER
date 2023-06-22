const mqtt = require('mqtt');
const fs = require('fs');

// MQTT broker URL
const brokerUrl = 'mqtt://test.mosquitto.org:1883';

// MQTT client options
const clientOptions = {
    clientId: 'test', // Unique identifier for your client
    clean: true, // Clean session flag
};

// Connect to MQTT broker
const client = mqtt.connect(brokerUrl, clientOptions);

// Publish MQTT message
function publishMessage(topic, message) {
    client.publish(topic, message, (error) => {
        if (error) {
            console.error('Failed to publish message:', error);
        } else {
            console.log('Message published successfully!:' + topic);
        }
        client.end(); // Disconnect from MQTT broker
    });
}

// Import JSON data from file
function importJsonFromFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Failed to import JSON file:', error);
        return null;
    }
}

// Example usage
const topic = 'MC/V1/testing';
const topic1 = 'testing_new';
const filePath = 'agentsTSsub1.json';

//const filePath1 = 'agentsTSsub1.json';

const jsonData = importJsonFromFile(filePath);
if (jsonData) {
    const message = JSON.stringify(jsonData);
    publishMessage(topic, message);
}