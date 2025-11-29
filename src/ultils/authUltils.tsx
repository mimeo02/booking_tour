import { redirect } from "react-router-dom";

export const requireAuth = () => {
  // 1. Lấy trạng thái đăng nhập
  const isUserLoggedIn = Boolean(localStorage.getItem("accessToken"));

  // 2. Kiểm tra điều kiện
  if (!isUserLoggedIn) {
    // 3. Nếu chưa đăng nhập, sử dụng redirect() của React Router
    // để chuyển hướng đến trang đăng nhập
    return redirect("/login");
  }

  // 4. Nếu đã đăng nhập, trả về null (hoặc dữ liệu cần tải)
  return null;
};
