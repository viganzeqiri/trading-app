import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useLazyGetUserQuery } from "../app/api/auth";
import { selectUser, setUser } from "../app/features/userSlice";
import { useAppDispatch, useAppSelector } from "../app/store";

export default function useAuthRedirects() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [getUser] = useLazyGetUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const base64Payload = token.split(".")[1];
      const payload = atob(base64Payload);

      (async () => {
        const getUserData = await getUser({
          userId: JSON.parse(payload).userId,
        }).unwrap();
        dispatch(setUser(getUserData.user));
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user && pathname !== "/register" && !localStorage.getItem("token")) {
      navigate("/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user?._id]);
}
