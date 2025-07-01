// // src/pages/columns.tsx
// "use client"

// import { ColumnDef } from "@tanstack/react-table"

// // IMPORTANT: Make sure this Transaction interface matches the one in your PayIn.tsx
// // If it's in a shared types file, import it from there.
// interface Transaction {
//   id: string;
//   customer: string;
//   amount: number;
//   status: 'Pending' | 'Successful' | 'Failed'; // These statuses need to match your Supabase data
//   date: string; // Stored as ISO string or date string
//   payment_method: string;
//   description?: string;
//   phone?: string;
//   paybill?: string;
//   purpose?: string; // Renamed from description for clarity if both exist
//   reference?: string;
// }

// export const columns: ColumnDef<Transaction>[] = [
//   {
//     accessorKey: "id",
//     header: "Transaction ID",
//     cell: ({ row }) => <div className="text-sm font-medium">{row.getValue("id")}</div>,
//   },
//   {
//     accessorKey: "customer",
//     header: "Customer",
//     cell: ({ row }) => <div>{row.getValue("customer")}</div>,
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"));
//       // Ensure proper locale formatting for KES
//       const formatted = new Intl.NumberFormat("en-KE", { // "en-KE" for Kenya Shillings
//         style: "currency",
//         currency: "KES",
//       }).format(amount);
//       return <div className="font-medium text-right">{formatted}</div>; // Added text-right for currency alignment
//     },
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status: Transaction['status'] = row.getValue("status");
//       let statusClass = '';
//       switch (status) {
//         case 'Successful':
//           statusClass = 'text-green-600 bg-green-50';
//           break;
//         case 'Pending':
//           statusClass = 'text-yellow-600 bg-yellow-50';
//           break;
//         case 'Failed':
//           statusClass = 'text-red-600 bg-red-50';
//           break;
//         default:
//           statusClass = 'text-gray-600 bg-gray-50';
//       }
//       return (
//         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
//           {status}
//         </span>
//       );
//     },
//   },
//   {
//     accessorKey: "payment_method",
//     header: "Method",
//     cell: ({ row }) => <div>{row.getValue("payment_method")}</div>,
//   },
//   {
//     accessorKey: "date",
//     header: "Date",
//     cell: ({ row }) => <div>{new Date(row.getValue("date")).toLocaleDateString()}</div>,
//   },
//   // You can uncomment and add more columns if you want to display phone, paybill, purpose, reference
//   // {
//   //   accessorKey: "phone",
//   //   header: "Phone",
//   // },
//   // {
//   //   accessorKey: "paybill",
//   //   header: "Paybill",
//   // },
//   // {
//   //   accessorKey: "purpose", // Changed from description for clarity if both exist
//   //   header: "Purpose",
//   // },
//   // {
//   //   accessorKey: "reference",
//   //   header: "Reference",
//   // },
// ];

// src/pages/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react" // Import icons for sorting and actions
import { Button } from "@/components/ui/button" // Assuming you have this button component

// IMPORTANT: Make sure this Transaction interface matches the one in your PayIn.tsx
// If it's in a shared types file, import it from there.
interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: 'Pending' | 'Successful' | 'Failed'; // These statuses need to match your Supabase data
  date: string; // Stored as ISO string or date string
  payment_method: string;
  description?: string;
  phone?: string;
  paybill?: string;
  purpose?: string;
  reference?: string;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => { // Make header sortable
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-sm font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => { // Make header sortable
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => { // Make header sortable
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
      }).format(amount);
      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => { // Make header sortable
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status: Transaction['status'] = row.getValue("status");
      let statusClass = '';
      switch (status) {
        case 'Successful':
          statusClass = 'text-green-600 bg-green-50';
          break;
        case 'Pending':
          statusClass = 'text-yellow-600 bg-yellow-50';
          break;
        case 'Failed':
          statusClass = 'text-red-600 bg-red-50';
          break;
        default:
          statusClass = 'text-gray-600 bg-gray-50';
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => { // Make header sortable
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Method
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("payment_method")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => { // Make header sortable
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{new Date(row.getValue("date")).toLocaleDateString()}</div>,
  },
  // You can uncomment and add more columns if you want to display phone, paybill, purpose, reference
  // {
  //   accessorKey: "phone",
  //   header: "Phone",
  //   cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  // },
  // {
  //   accessorKey: "paybill",
  //   header: "Paybill",
  //   cell: ({ row }) => <div>{row.getValue("paybill")}</div>,
  // },
  // {
  //   accessorKey: "purpose",
  //   header: "Purpose",
  //   cell: ({ row }) => <div>{row.getValue("purpose")}</div>,
  // },
  // {
  //   accessorKey: "reference",
  //   header: "Reference",
  //   cell: ({ row }) => <div>{row.getValue("reference")}</div>,
  // },
];