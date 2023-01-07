import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import { red, green, blue, orange, blueGrey } from "@mui/material/colors";

type CardCanvasProps = {
    title: string;
    subheader?: string;
    children: React.ReactNode;
};
export function CardCanvas({ title, subheader, children }: CardCanvasProps) {
    return (
        <Card sx={{ backgroundColor: blueGrey[700], color: blueGrey[50] }}>
            <CardHeader
                title={title}
                sx={{ color: blueGrey[50] }}
                subheader={subheader}
                subheaderTypographyProps={{ color: blueGrey[200] }}
            />
            {children}
        </Card>
    );
}
