import { useGetBTCPriceQuery } from "../app/api/btc";
import Spinner from "./Spinner";

export default function BtcPrice() {
  const { data, isLoading, isError } = useGetBTCPriceQuery({});

  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="my-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="btn-group my-8 text-white">
      <div>
        BTC price in USDT:{" "}
        <span className="font-extrabold text-yellow">
          {(data?.price || 0).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </div>
  );
}
