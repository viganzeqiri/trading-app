import { useState } from "react";
import BtcPrice from "../components/BtcPrice";

import Tabs from "../components/Tabs";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Trade() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  function handleTabChange(type: "buy" | "sell") {
    setActiveTab(type);
  }

  return (
    <main className="w-screen min-h-[90vh] bg-purple flex flex-col items-center justify-center">
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <BtcPrice />
      <TransactionForm type={activeTab} />
      <TransactionList />
    </main>
  );
}
