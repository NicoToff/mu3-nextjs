import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ColonneLumineuse } from "../components/ColonneLumineuse";

export default function System() {
    const [redState, setRedState] = useState(false);
    const [orangeState, setOrangeState] = useState(false);
    const [greenState, setGreenState] = useState(false);
    const [blueState, setBlueState] = useState(false);

    return (
        <div className="container">
            <Typography variant="h2" component="h1" m={3}>
                Système intelligent
            </Typography>

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
