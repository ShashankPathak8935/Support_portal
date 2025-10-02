import * as yup from "yup";

export const signUpValidation = yup.object({
  username: yup.string().trim().required("Full name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup.string().trim().required("role is required"),
});


export const logInValidation = yup.object({
    email: yup.string().trim().required("Email is required"),
    password: yup.string().trim().required("Password is required")
});
