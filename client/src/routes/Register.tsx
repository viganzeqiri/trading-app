import { Navigate } from "react-router-dom";

import AuthForm, {
  type AuthFormError,
  type AuthFormData,
} from "../components/AuthForm";
import { useRegisterMutation } from "../app/api/auth";
import { setUser } from "../app/features/userSlice";
import { useAppDispatch } from "../app/store";

export default function Register() {
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  async function handleRegister({ privateKey, publicKey }: AuthFormData) {
    try {
      const registerData = await register({
        publicKey,
        privateKey,
      }).unwrap();

      localStorage.setItem("token", registerData.token);
      dispatch(setUser(registerData.user));
    } catch (error) {
      console.error(error);
    }
  }

  if (isSuccess) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="w-screen h-[90vh] flex items-center justify-center bg-purple text-yellow">
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        loading={isLoading}
        error={error as AuthFormError}
      />
    </div>
  );
}
