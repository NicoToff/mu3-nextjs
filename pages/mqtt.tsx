import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

type Message = { [key: string]: string };

export default function Mqtt() {
    const [rows, setRows] = useState<GridRowsProp>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://localhost:3333/api")
                .then(res => res.json())
                .then((data: Message) => setRows(makeRows(data)))
                .catch(console.error);
        }, 5000);
        return () => clearInterval(interval);
    }, [rows]);

    const columns: GridColDef[] = [
        { field: "tag", headerName: "Tag", width: 100 },
        { field: "val", headerName: "Value", width: 200 },
        { field: "date", headerName: "Date", width: 200 },
        { field: "time", headerName: "Time", width: 200 },
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

const getDate = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
});

const getTime = new Intl.DateTimeFormat("fr-FR", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3,
});

function makeRows(data: Message): GridRowsProp {
    return Object.entries(data).map(([tag, valAndTs], id) => {
        const [val, timestamp] = valAndTs.split(";;");
        return {
            id,
            tag,
            val,
            date: new Date(Number(timestamp)).toISOString(),
            time: getTime.format(parseInt(timestamp)),
        };
    });
}
