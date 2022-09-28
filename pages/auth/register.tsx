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
import Link from "next/link";

const loginFormValidator = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid Email")
    .required("A valid email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters"),
  //confirm password must match password
  confirmed_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const RegisterPage = () => {
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
      first_name: "",
      last_name: "",
      confirmed_password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/register", data);
      toast.success("You have successfully registered");
    } catch (error) {
      const errorMsg = error?.response?.data;
      toast.error(
        "Ensure your email is strong and password is greater than 8 characters containing a symbol,digit and capital letter"
      );
      if (errorMsg?.invalid) {
        // toast.error(errorMsg?.invalid[0]);
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
          Create An Account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column">
            <Controller
              control={control}
              name="first_name"
              render={({ field, fieldState }) => (
                <TextField
                  id="outlined-basic"
                  label="Enter First Name"
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
              name="last_name"
              render={({ field, fieldState }) => (
                <TextField
                  id="outlined-basic"
                  label="Enter Last Name"
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
            <Controller
              control={control}
              name="confirmed_password"
              render={({ field, fieldState }) => (
                <TextField
                  id="outlined-basic"
                  label="Enter Confirm Password"
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
              Create an Account
            </Button>
            <Link href="/auth/login">
              <Typography
                color="secondary"
                textAlign="center"
                marginTop="30px"
                marginBottom="10px"
                sx={{
                  cursor: "pointer",
                }}
              >
                Have an Account? Login
              </Typography>
            </Link>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default RegisterPage;
