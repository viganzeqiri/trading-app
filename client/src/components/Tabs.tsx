interface Props {
  activeTab: "buy" | "sell";
  onTabChange: (newTab: Props["activeTab"]) => void;
}

export default function Tabs({ activeTab, onTabChange }: Props) {
  const activeClasses = "bg-yellow hover:bg-yellow";

  function handleTabClick(type: Props["activeTab"]) {
    onTabChange(type);
  }

  return (
    <div className="btn-group mt-4">
      <button
        className={`btn ${activeTab === "buy" ? activeClasses : ""}`}
        onClick={() => handleTabClick("buy")}
      >
        Buy
      </button>
      <button
        className={`btn ${activeTab === "sell" ? activeClasses : ""}`}
        onClick={() => handleTabClick("sell")}
      >
        Sell
      </button>
    </div>
  );
}
