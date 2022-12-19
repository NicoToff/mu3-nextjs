import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { formatTimeAgo } from "../utils/time-ago-formatter";

type Message = { [key: string]: string };

export default function Mqtt() {
    const [rows, setRows] = useState<GridRowsProp>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://localhost:3333/api")
                .then(res => res.json())
                .then((data: Message) => setRows(makeRows(data)))
                .catch(console.error);
        }, 2000);
        return () => clearInterval(interval);
    }, [rows]);

    const columns: GridColDef[] = [
        { field: "mu", headerName: "MU", type: "number", width: 50 },
        { field: "zone", headerName: "Zone", type: "number", width: 50 },
        { field: "tag", headerName: "Tag", width: 250 },
        { field: "val", headerName: "Valeur", width: 200 },
        { field: "date", headerName: "Date (ISO)", width: 200 },
        { field: "time", headerName: "Dernier update", width: 200, sortable: false },
    ];

    return (
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                MU3 Tags
            </Typography>
            <div style={{ height: "95vh", width: "99%" }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </Container>
    );
}

function makeRows(data: Message): GridRowsProp {
    return Object.entries(data).map(([tag, valAndTs], id) => {
        const [val, timestamp] = valAndTs.split(";;");
        return {
            id,
            mu: 3,
            zone: 5,
            tag,
            val,
            date: new Date(parseInt(timestamp)).toISOString(),
            time: formatTimeAgo(parseInt(timestamp)),
        };
    });
}
