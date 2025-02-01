import type { FC } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { formOptions, useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";

import Link from "@/components/Link";
import type { RegisterRequest } from "@/interfaces/auth";
import { postRegister } from "@/services/auth.service";

const FormCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const formSchema = z.object({
  email: z.string().email("Please provide an email"),
  password: z.string().min(1, "Please provide a password"),
});

const formOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
  validators: {
    onChange: formSchema,
  },
});

const Register: FC = () => {
  const navigate = useNavigate({ from: "/register" });

  const form = useForm<RegisterRequest>({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await postRegister(value)
        .then((response) => {
          console.log(response);
          navigate({ to: "/" });
        })
        .catch((error: ApiError) => toast.error(error.title));
    },
  });

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ minHeight: "100vh" }}
    >
      <FormCard variant="outlined">
        <Typography
          component="h1"
          variant="h4"
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <form.Field
            name="email"
            children={(field) => {
              const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              const errorMessage = field.state.meta.errors.join(", ");

              return (
                <FormControl>
                  <FormLabel htmlFor={field.name}>Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="your@email.com"
                    error={hasError}
                    helperText={errorMessage}
                    color={hasError ? "error" : "primary"}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </FormControl>
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              const errorMessage = field.state.meta.errors.join(", ");

              return (
                <FormControl>
                  <FormLabel htmlFor={field.name}>Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="••••••"
                    type="password"
                    error={hasError}
                    helperText={errorMessage}
                    color={hasError ? "error" : "primary"}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </FormControl>
              );
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit]) => (
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!canSubmit}
              >
                Submit
              </Button>
            )}
          />
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Register with Google")}
          >
            Register with Google
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              variant="body2"
              sx={{ alignSelf: "center" }}
              to="/login"
            >
              Login
            </Link>
          </Typography>
        </Box>
      </FormCard>
    </Stack>
  );
};

export default Register;
