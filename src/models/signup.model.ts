import * as Yup from "yup";

export const signUpPayloadSchema = Yup.object({
  username: Yup.string().required("Tên đăng nhập là bắt buộc").default(""),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc")
    .default(""),
  password: Yup.string().required("Mật khẩu là bắt buộc").default(""),
  phone: Yup.string().required("Số điện thoại là bắt buộc").default(""),
  fullName: Yup.string().required("Họ và tên là bắt buộc").default(""),
  idCard: Yup.string().required("CCCD/CMND là bắt buộc").default(""),
});

export type SignUpPayloadSchema = Yup.InferType<typeof signUpPayloadSchema>;
