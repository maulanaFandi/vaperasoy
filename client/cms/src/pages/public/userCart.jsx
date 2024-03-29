import { Box, Typography } from "@mui/material";
import gifSleep from "../../assets/7Tgm.gif";
export default function Cart() {
  return (
    <Box>
      <img
        src={gifSleep}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          padding: 0,
          marginTop: 0,
          border: "none",
        }}
        allowFullScreen></img>
      <Box>
        <Typography
          variant="body1"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            color: "#ffffff",
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
          Sorry, our developers are currently exhausted, and this page is still
          inaccessible.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            color: "#ffffff",
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
          "To purchase items available in the catalog, please come directly to
          the store."{""}
        </Typography>
      </Box>
    </Box>
  );
}
