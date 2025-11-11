// login.model.ts
import * as Yup from "yup";

export const loginPayloadSchema = Yup.object().shape({
  username: Yup.string().required("Email is required").default(""),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .default(""),
});

export type LoginPayloadSchema = Yup.InferType<typeof loginPayloadSchema>;
