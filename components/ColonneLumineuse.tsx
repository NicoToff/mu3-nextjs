import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import LumIcon from "@mui/icons-material/Lightbulb";

import { red, green, blue, orange, blueGrey } from "@mui/material/colors";

const OFF = blueGrey[800];
type ColonneLumineuseProps = {
    redState: boolean;
    orangeState: boolean;
    greenState: boolean;
    blueState: boolean;
};
export function ColonneLumineuse({ redState, orangeState, greenState, blueState }: ColonneLumineuseProps) {
    return (
        <Card sx={{ backgroundColor: blueGrey[700], color: blueGrey[50] }}>
            <CardHeader
                title="Colonne lumineuse"
                sx={{ color: blueGrey[50] }}
                subheader="État de la colonne 5 en temps réel"
                subheaderTypographyProps={{ color: blueGrey[200] }}
            />
            <CardActions disableSpacing sx={{ display: "flex", justifyContent: "center" }}>
                <LumIcon sx={{ color: redState ? red[600] : OFF }} fontSize="large" />
                <LumIcon sx={{ color: orangeState ? orange[600] : OFF }} fontSize="large" />
                <LumIcon sx={{ color: greenState ? green[600] : OFF }} fontSize="large" />
                <LumIcon sx={{ color: blueState ? blue[600] : OFF }} fontSize="large" />
            </CardActions>
        </Card>
    );
}
