const mqtt = require('mqtt');
var fs = require('fs');
const brokerUrl = 'mqtt://test.mosquitto.org:1883'; // Replace with your MQTT broker URL
const topic = 'MC/V1/testing';
const topic2 = 'MC/V1/testing2';
const topic3 = 'MC/V1/testing3';
let publishedMessages = {};

// Create MQTT client
const client = mqtt.connect(brokerUrl);

// MQTT client connect event
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    const subjson2 = fs.readFile(
        './agentsTSsub1.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return;
            }
        }
    )
});

// MQTT message event
client.on('message', (receivedTopic, message) => {
    console.log('Received message:', message.toString());
    // Extract the message ID from the received message
    const messageId = extractMessageId(message);

    // Send acknowledgment to the publisher
    // client.publish('ackTopic', messageId);
    //client.publish(MC / V1 / testing, messageId);
    //client.publish(topic2, messageId);
    // client.publish(topic3, messageId);
    //client.publish(topic3, JSON.stringify(jsonData));
    client.publish(topic, addMessageIdToMessage)
        // Process the received message
        //processMessage(message);

    // Remove the acknowledged message from the local storage
    delete publishedMessages[messageId];
});

// Publisher Program
function publishMessage(message, jsondata) {
    // Generate a unique message ID
    const messageId = generateMessageId();
    // Store the published message and its message ID
    publishedMessages[messageId] = message;
    const subjson1 = fs.readFile(
            './agentsTSsub1.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading JSON file:', err);
                    return;
                }
            })
        // Publish the message with the generated message ID
    client.publish(topic, addMessageIdToMessage(message, subjson1, messageId));
    // client.publish(topic2, addMessageIdToMessage(message, messageId));
    //client.publish(topic3, addMessageIdToMessage(message, messageId));
    //client.publish(topic3, publishData);
    //client.publish(topic3, JSON.stringify(jsonData));
}

// Function to extract the message ID from the received message
function extractMessageId(message) {
    // Extract the message ID from the message
    // Example: Assuming the message format is "<message>|<messageId>"
    const parts = message.toString().split('|');
    return parts[1];
}

// Function to process the received message
function processMessage(message) {
    // Process the message as needed
    console.log('Processing message:', message.toString());
}

// Function to generate a unique message ID
function generateMessageId() {
    // Generate a unique identifier
    return Date.now().toString();
}

// Function to add the message ID to the message
function addMessageIdToMessage(message, subjson4, messageId) {
    let existingData = [];
    // Append the message ID to the message
    // Example: Assuming the message format is "<message>|<messageId>"
    subjson4 = fs.readFile(
        './agentsTSsub1.json', 'utf8', (err, data) => {
            existingData = JSON.parse(subjson4);
            if (err) {
                console.error('Error reading JSON file:', err);
                return;
            }
        })
    fs.writeFile('./agentsTSsub1.json', JSON.stringify(existingData, null, 2), 'utf-8', (writeError) => {
        if (writeError) {
            console.error('Failed to write JSON file:', writeError);
            return;
        }
    })

    return `${message}${subjson4}|${messageId}`;
}

// Publish a message


publishMessage('message:');

function publishData(client) {
    const mqttTopic = 'topic3'; // Replace 'your/topic' with the topic you want to publish to

    // Prepare your JSON data
    const jsonData = {
        "Sync2Shore": [{
                    "Bearers": [{
                        "Type": "<satelite, mbb, wifi>",
                        "Priority": "67890"
                    }],
                    "PubOnMQTT": true
                }

            ]
            // Add more key-value pairs as needed
    };

    // Publish JSON data
    client.publish(mqttTopic, JSON.stringify(jsonData), (err) => {
        if (err) {
            console.log('Error publishing message:', err);
        } else {
            console.log('Message published successfully');
            client.end(); // Close the MQTT connection
        }
    });
}