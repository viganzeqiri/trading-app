import { selectUser } from "../app/features/userSlice";
import { useAppSelector } from "../app/store";

export default function Balance() {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex my-8 text-white">
      <div className="mr-8">
        Balance in BTC:{" "}
        <span className="font-extrabold text-yellow">
          {user?.btcBalance?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>

      <div>
        Balance in USDT:{" "}
        <span className="font-extrabold text-yellow">
          {user?.usdtBalance?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </div>
  );
}
