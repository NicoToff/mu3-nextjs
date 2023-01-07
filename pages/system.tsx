import { useState } from "react";
import Grid from "@mui/material/Grid";

import { ColonneLumineuse } from "../components/ColonneLumineuse";

export default function System() {
    const [redState, setRedState] = useState(false);
    const [orangeState, setOrangeState] = useState(false);
    const [greenState, setGreenState] = useState(false);
    const [blueState, setBlueState] = useState(false);

    return (
        <div className="container">
            <h1>Système intelligent</h1>

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
