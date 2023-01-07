import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowsProp, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

import { prisma } from "../prisma/prisma-client";
import type { Tag } from "@prisma/client";

export async function getServerSideProps() {
    const tags = await prisma.tag.findMany({
        where: { isVisible: 1 },
        select: {
            name: true,
            value: true,
            lastUpdate: true,
        },
    });
    return {
        props: {
            tags: JSON.parse(JSON.stringify(tags)),
        },
    };
}

type DashboardProps = { tags: Tag[] };

export default function Dashboard({ tags }: DashboardProps) {
    const columns: GridColDef[] = [
        { field: "tag", headerName: "Tag", width: 250 },
        { field: "val", headerName: "Valeur", width: 200 },
        { field: "date", headerName: "Date (ISO)", width: 200 },
    ];

    const rows: GridRowsProp = tags.map(tag => ({
        id: tag.name,
        tag: tag.name,
        val: tag.value,
        date: tag.lastUpdate,
    }));

    const MATERIAL_UI_STANDARD_ROW_HEIGHT = 52;
    const SPACE_FOR_HEADER_AND_FOOTER = 111;
    const SCREEN_FITTING_HEIGHT = "90vh";
    const height =
        rows.length <= 10
            ? `${SPACE_FOR_HEADER_AND_FOOTER + (rows.length || 1) * MATERIAL_UI_STANDARD_ROW_HEIGHT}px`
            : SCREEN_FITTING_HEIGHT;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Dashboard</h1>
                </div>

                <Typography gutterBottom>{`Le tableau contient les dernières données insérées dans la base de données.
                       Les tags visibles ont été choisis par l'administrateur.
                       Il n'est pas mis à jour automatiquement.`}</Typography>
                <div style={{ height, width: "99%" }}>
                    <DataGrid rows={rows} columns={columns} sx={{ color: "whitesmoke" }} />
                </div>
            </div>
        </div>
    );
}
