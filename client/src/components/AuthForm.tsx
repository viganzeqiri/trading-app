import { Link } from "react-router-dom";

export type AuthFormData = {
  privateKey: string;
  publicKey: string;
};

export type AuthFormError = {
  data: { error: string };
};

interface IProps {
  type: "signin" | "register";
  onSubmit?: (data: AuthFormData) => void;
  loading?: boolean;
  error?: AuthFormError;
}

export default function AuthForm({
  type,
  onSubmit,
  loading = false,
  error,
}: IProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData) as AuthFormData;

    onSubmit?.(formProps);
  }

  return (
    <div className="card w-80 bg-white text-gray">
      <div className="card-body">
        <h2 className="card-title mb-4">
          {type === "signin" ? "Sign In" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            autoComplete="off"
            name="publicKey"
            type="text"
            placeholder="Address"
            className="input input-bordered w-full max-w-xs mb-4"
          />

          <input
            autoComplete="off"
            name="privateKey"
            type="password"
            placeholder="Private key"
            className="input input-bordered w-full max-w-xs"
          />

          <div className="card-actions items-center justify-between mt-4">
            <Link to={type === "signin" ? "/register" : "/signin"}>
              Switch to {type !== "signin" ? "Sign In" : "Register"}
            </Link>

            <button
              className={`btn bg-yellow border-0" type="submit ${
                loading ? "loading" : ""
              }`}
            >
              {type === "signin" ? "Sign In" : "Register"}
            </button>
          </div>

          {!!error && <p className="text-error">{error.data.error}</p>}
        </form>
      </div>
    </div>
  );
}
