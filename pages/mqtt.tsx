import { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowsProp, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

import { connect } from "mqtt";
import type { MqttClient } from "mqtt";

const mqttDomain = "backup.kermareg.be";
const port = 9001;
const mqttUri = `ws://${mqttDomain}`;
const options = {
    username: "groupe2",
    password: "groupe2",
    port,
    keepalive: 60,
};

export default function Mqtt() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const { data: session } = useSession();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

        return () => clearInterval(timer);
    }, [time]);

    const [rows, setRows] = useState<GridRowsProp>([]);

    const client = useRef<MqttClient>();
    const [mqttConnected, setMqttConnected] = useState(false);

    useEffect(() => {
        client.current = connect(mqttUri, options);
        client.current.on("connect", () => {
            console.log(`Connected to ${mqttUri}`);
            setMqttConnected(true);
        });
        client.current.subscribe("/groupe2/#");
        client.current.on("message", (topic, message) => {
            const tag = topic.split("/").pop(); // Gets the last word of the topic
            if (tag) {
                const value = message.toString();
                const timestamp = Date.now().toString();
                const row = makeRow(tag, value, timestamp);
                setRows(prevRows => {
                    const newRows = [...prevRows];
                    const existingRow = newRows.find(r => r.id === row.id);
                    if (existingRow) {
                        Object.assign(existingRow, row); // Updates an existing row
                    } else {
                        newRows.push(row); // Adds new row
                    }
                    return newRows;
                });
            }
        });
    }, []);

    const columns: GridColDef[] = [
        { field: "mu", headerName: "MU", type: "number", width: 50 },
        { field: "tag", headerName: "Tag", width: 250 },
        { field: "val", headerName: "Valeur", width: 200 },
        { field: "date", headerName: "Date (ISO)", width: 200 },
    ];

    if (!session) return <button onClick={() => signIn("discord")}>Please, log in</button>;

    return (
        <Container>
            <Button onClick={() => signOut()} variant="contained">
                Log out
            </Button>
            <Typography variant="h3" component="h1" gutterBottom>
                MU3 Tags
            </Typography>
            {mqttConnected ? (
                <Chip label="MQTT Connected" color="success" sx={{ mb: 3 }} />
            ) : (
                <Chip label="MQTT Disconnected" color="error" sx={{ mb: 3 }} />
            )}
            <div style={{ height: "95vh", width: "99%" }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </Container>
    );
}

function makeRow(tag: string, val: string, timestamp: string | number): GridValidRowModel {
    return {
        id: tag,
        mu: 3,
        tag,
        val,
        date: new Date(Number(timestamp)).toISOString(),
    };
}
