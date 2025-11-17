// login.model.ts
import * as Yup from "yup";

export const loginPayloadSchema = Yup.object().shape({
  username: Yup.string().required("Tên đăng nhập là bắt buộc").default(""),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc")
    .default(""),
});

export type LoginPayloadSchema = Yup.InferType<typeof loginPayloadSchema>;
