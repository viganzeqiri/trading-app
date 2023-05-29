import { clearUser, selectUser } from "../app/features/userSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import Balance from "./Balance";

export default function Header() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(clearUser());
    localStorage.removeItem("token");
  }

  return (
    <header className="h-[10vh] bg-purple p-4 flex items-center justify-between">
      <section>
        <h1 className="text-yellow text-4xl font-extrabold">Trading App</h1>
      </section>

      <main className="flex items-center">
        {!!user && (
          <>
            <Balance />
            <button
              className="btn border-0 bg-yellow text-white cursor-pointer font-extrabold ml-6"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        )}
      </main>
    </header>
  );
}
