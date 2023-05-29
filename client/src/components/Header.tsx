import { clearUser, selectUser } from "../app/features/userSlice";
import { useAppDispatch, useAppSelector } from "../app/store";

export default function Header() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(clearUser());
    localStorage.removeItem("token");
  }

  return (
    <nav className="h-[10vh] bg-purple p-4 flex items-center justify-between">
      <h1 className="text-yellow text-4xl font-extrabold">Trading App</h1>
      {!!user && (
        <h4
          className="text-white cursor-pointer font-extrabold"
          onClick={handleLogout}
        >
          Log out
        </h4>
      )}
    </nav>
  );
}
