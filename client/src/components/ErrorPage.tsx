import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div
      id="error-page"
      className="w-screen h-screen flex flex-col items-center justify-center bg-purple text-white"
    >
      <h1 className="text-5xl mb-6">Oops!</h1>
      <p>
        <b>{errorMessage}</b>
      </p>

      <p>
        Go back{" "}
        <Link to="/app">
          <span className="font-bold cursor-pointer">Home</span>
        </Link>
      </p>
    </div>
  );
}
