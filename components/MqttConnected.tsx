import Chip from "@mui/material/Chip";

export function MqttConnected({ connected }: { connected: boolean }) {
    return (
        <>
            {connected ? (
                <Chip label="MQTT Connected" color="success" sx={{ mb: 3 }} />
            ) : (
                <Chip label="MQTT Disconnected" color="error" sx={{ mb: 3 }} />
            )}
        </>
    );
}
