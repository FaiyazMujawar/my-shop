import { Table } from "@components/ui/table";
import { auth } from "@config/auth";
import { getAllOrders } from "@db/order";
import { redirect } from "next/navigation";
import { useReactTable } from "@tanstack/react-table";
import { FaEye } from "react-icons/fa6";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const Dashboard = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const orders = await getAllOrders(session?.user!);

  return (
    <div className="space-y-4">
      <div className="text-2xl">All Orders</div>
      <DataTable data={orders} columns={columns} />
    </div>
  );
};

export default Dashboard;
