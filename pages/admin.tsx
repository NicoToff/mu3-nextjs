import { useState, useEffect, useRef } from "react";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowsProp, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

import { connect } from "mqtt";
import type { MqttClient } from "mqtt";

import { prisma } from "../prisma/prisma-client";
import type { Tag } from "@prisma/client";
import type { TagVisibilityResponse } from "./api/tag-visibility";

export async function getServerSideProps() {
    const tags = await prisma.tag.findMany({
        select: {
            name: true,
            isVisible: true,
        },
    });
    return {
        props: {
            tags: JSON.parse(JSON.stringify(tags)),
        },
    };
}

const mqttDomain = "backup.kermareg.be";
const port = 9001;
const mqttUri = `ws://${mqttDomain}`;
const options = {
    username: "groupe2",
    password: "groupe2",
    port,
    keepalive: 60,
};

type MqttProps = { tags: Tag[] };

export default function Mqtt({ tags }: MqttProps) {
    const [tagMap, setTagMap] = useState(new Map<string, number>(tags.map(t => [t.name, t.isVisible ? 1 : 0])));

    const [rows, setRows] = useState<GridRowsProp>([]);

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
                const value = message.toString();
                const timestamp = Date.now().toString();
                const row = makeRow(tag, value, timestamp, tagMap.get(tag) || 0);
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

        return () => {
            client.current?.unsubscribe("/groupe2/#");
            client.current?.removeAllListeners();
        };

        function makeRow(
            tagName: string,
            val: string,
            timestamp: string | number,
            isVisible: number
        ): GridValidRowModel {
            return {
                id: tagName,
                mu: 3,
                tag: tagName,
                val,
                date: new Date(Number(timestamp)).toISOString(),
                actif: (
                    <Switch
                        checked={!!isVisible}
                        onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                            const { updatedValue } = await fetch("/api/tag-visibility", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    tagName,
                                    isVisible: event.target.checked ? 1 : 0,
                                }),
                            })
                                .then(res => res.json() as Promise<TagVisibilityResponse>)
                                .catch(err => {
                                    console.error(err);
                                    return { updatedValue: undefined } satisfies TagVisibilityResponse;
                                });
                            if (updatedValue != null) {
                                setTagMap(prevMap => new Map(prevMap).set(tagName, Number(updatedValue)));
                            }
                        }}
                    />
                ),
            };
        }
    }, [tagMap]);

    const columns: GridColDef[] = [
        { field: "mu", headerName: "MU", type: "number", width: 50 },
        { field: "tag", headerName: "Tag", width: 250 },
        { field: "val", headerName: "Valeur", width: 200 },
        { field: "date", headerName: "Date (ISO)", width: 200 },
        {
            field: "actif",
            headerName: "Actif ?",
            width: 70,
            renderCell: params => params.value,
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                MU3 Tags
            </Typography>
            {mqttConnected ? (
                <Chip label="MQTT Connected" color="success" sx={{ mb: 3 }} />
            ) : (
                <Chip label="MQTT Disconnected" color="error" sx={{ mb: 3 }} />
            )}
            <Typography gutterBottom>{`Le tableau ci-dessous est mis à jour en temps réel. Les tags marqués "Actifs"
                seront visibles sur la page Dashboard.`}</Typography>
            <div style={{ height: "95vh", width: "99%" }}>
                <DataGrid rows={rows} columns={columns} sx={{ color: "whitesmoke" }} />
            </div>
        </Container>
    );
}
