import { Box, Button, Typography } from "@mui/material";
import { AxiosError } from "axios";

type ErrorFallbackProps = {
  error: AxiosError;
  resetErrorBoundary: () => void;
};

const ErrorMessage = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  let message;
  if (error.response?.status === 429) {
    message = "Rate limit exceeded. Please wait a while before retrying";
  } else {
    message = "Error encountered fetching stock price data";
  }

  return (
    <>
      <Typography variant="h6">{message}</Typography>
      <Button variant="contained" color="error" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </>
  );
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <ErrorMessage error={error} resetErrorBoundary={resetErrorBoundary} />
    </Box>
  );
};

export default ErrorFallback;
