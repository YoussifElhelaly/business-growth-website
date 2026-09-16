import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandMark, Button, Input } from "../design-system/index.js";
import { useAdminLogin } from "../api/adminHooks.js";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAdminLogin();

  const submit = (e) => {
    e.preventDefault();
    login.mutate(
      { username, password },
      { onSuccess: () => navigate("/admin/services", { replace: true }) }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-6">
      <form onSubmit={submit} className="w-full max-w-[400px] bg-white p-8">
        <div className="flex flex-col items-center gap-3 pb-6 text-center">
          <BrandMark size={40} className="text-copper" />
          <h1 className="font-display text-xl font-bold text-text-strong">تسجيل دخول لوحة التحكم</h1>
        </div>
        <div className="flex flex-col gap-4">
          <Input label="اسم المستخدم" value={username} onChange={setUsername} required />
          <Input label="كلمة المرور" type="password" value={password} onChange={setPassword} required />
        </div>
        {login.isError && (
          <p className="mt-4 text-sm font-semibold text-danger-600">بيانات الدخول غير صحيحة</p>
        )}
        <Button type="submit" fullWidth className="mt-6" disabled={login.isPending}>
          {login.isPending ? "جارِ الدخول…" : "دخول"}
        </Button>
      </form>
    </div>
  );
}
