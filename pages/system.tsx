import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { MqttConnected } from "../components/MqttConnected";
import { connect } from "mqtt";
import type { MqttClient } from "mqtt";
import { ColonneLumineuse } from "../components/ColonneLumineuse";

const mqttDomain = "backup.kermareg.be";
const port = 9001;
const mqttUri = `ws://${mqttDomain}`;
const options = {
    username: "groupe2",
    password: "groupe2",
    port,
    keepalive: 60,
};

export default function System() {
    const [redState, setRedState] = useState(false);
    const [orangeState, setOrangeState] = useState(false);
    const [greenState, setGreenState] = useState(false);
    const [blueState, setBlueState] = useState(false);

    const client = useRef<MqttClient>();
    const [mqttConnected, setMqttConnected] = useState(false);

    useEffect(() => {
        client.current = connect(mqttUri, options);
        client.current.on("connect", () => {
            console.log("Connected");
            setMqttConnected(true);
        });
    }, []);

    useEffect(() => {
        if (!client.current) return;
        client.current.subscribe("/groupe2/#");
        client.current.on("message", (topic, message) => {
            const tag = topic.split("/").pop(); // Gets the last word of the topic
            if (tag) {
                const state = message.toString() === "1";
                // prettier-ignore
                switch (tag) {
                    case "Voyant_rouge": setRedState(state); break;
                    case "Voyant_orange": setOrangeState(state); break;
                    case "Voyant_vert": setGreenState(state); break;
                    case "Gyrophare_maintenance": setBlueState(state); break;
                }
            }
        });

        return () => {
            client.current?.unsubscribe("/groupe2/#");
            client.current?.removeAllListeners();
        };
    }, []);

    return (
        <div className="container">
            <Typography variant="h2" component="h1" m={3}>
                Système intelligent
            </Typography>
            <MqttConnected connected={mqttConnected} />

            <Grid container md={6}>
                <Grid item>
                    <ColonneLumineuse
                        redState={redState}
                        orangeState={orangeState}
                        greenState={greenState}
                        blueState={blueState}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
