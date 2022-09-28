import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { grey } from "@mui/material/colors";
import * as Yup from "yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const loginFormValidator = Yup.object({
  email: Yup.string()
    .email("Enter a valid Email")
    .required("A valid email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(loginFormValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/login", data);
      toast.success("You have successfully logged in");
    } catch (error) {
      const errorMsg = error?.response?.data;

      if (errorMsg?.invalid) {
        toast.error(errorMsg?.invalid[0]);
      }
    }
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: grey[200],
      }}
    >
      <Card
        sx={{
          padding: 2,
          width: "500px",
        }}
      >
        <Typography
          variant="h6"
          marginBottom={theme.spacing(2)}
          fontWeight="bold"
          textAlign="center"
        >
          Log In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column">
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <TextField
                  id="outlined-basic"
                  label="Enter Email"
                  variant="outlined"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{
                    marginBottom: theme.spacing(3),
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <TextField
                  id="outlined-basic"
                  label="Enter Password"
                  variant="outlined"
                  type="password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                  sx={{
                    marginBottom: theme.spacing(3),
                  }}
                />
              )}
            />
            <Button
              sx={{
                marginTop: theme.spacing(3),
              }}
              type="submit"
              variant="contained"
              disabled={!isValid}
            >
              Login
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default LoginPage;
