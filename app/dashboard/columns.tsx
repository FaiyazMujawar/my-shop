export type Order = {
  id: string;
  service: string;
  user: {
    name: string;
    email: string;
  };
  status: "PENDING" | "COMPLETED";
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date;
  responses: {
    id: string;
    question: string;
    type: "text" | "number" | "date" | "file";
    text?: string;
    url?: string;
  }[];
};

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "service.title",
    header: "Service",
  },
  {
    accessorKey: "service.price",
    header: "Price",
  },
  {
    accessorKey: "user.name",
    header: "User name",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
