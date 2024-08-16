import { useState } from "react";

import "./App.css";
import { Box, Button, Typography } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box>
      <Typography variant="h1">Vite + React</Typography>
      <Typography variant="h3">{count}</Typography>
      <Button onClick={() => setCount(count + 1)}>Upvote</Button>
    </Box>
  );
}

export default App;
