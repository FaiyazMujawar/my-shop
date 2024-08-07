"use client";

import { useRouter } from "next/navigation";

const DashboardButton = () => {
  const router = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => router.push("/dashboard")}>
      Dashboard
    </div>
  );
};

export default DashboardButton;
