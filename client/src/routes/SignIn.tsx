import { Navigate } from "react-router-dom";

import AuthForm, {
  type AuthFormError,
  type AuthFormData,
} from "../components/AuthForm";
import { useLoginMutation } from "../app/api/auth";
import { useAppDispatch } from "../app/store";
import { setUser } from "../app/features/userSlice";

export default function SignIn() {
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  async function handleSignIn({ privateKey, publicKey }: AuthFormData) {
    try {
      const loginData = await login({ publicKey, privateKey }).unwrap();

      localStorage.setItem("token", loginData.token);
      dispatch(setUser(loginData.user));
    } catch (error) {
      console.error(error);
    }
  }

  if (isSuccess) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="w-screen h-[90vh] flex flex-col items-center justify-center bg-purple text-yellow">
      <AuthForm
        type="signin"
        onSubmit={handleSignIn}
        loading={isLoading}
        error={error as AuthFormError}
      />
    </div>
  );
}
