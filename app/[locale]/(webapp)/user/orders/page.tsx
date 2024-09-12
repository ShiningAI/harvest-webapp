"use client";

import dayjs from "dayjs";
import { usePagination } from "ahooks";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserBox } from "@/components/UserBox";

export default function Page() {
  const { data, loading, pagination } = usePagination(
    async ({ current, pageSize }) => {
      const response = await fetch("/api/v1/orders", {
        method: "POST",
        body: JSON.stringify({ current, pageSize }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return (await response.json()) as any as { total: number; list: any[] };
    },
    {}
  );
  return (
    <UserBox title="Orders">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">名字</TableHead>
            <TableHead>充值金额</TableHead>
            <TableHead className="hidden md:table-cell">日期</TableHead>
            <TableHead className="hidden md:table-cell">支付状态</TableHead>
            {/* <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                Loading…
              </TableCell>
            </TableRow>
          ) : !data?.list.length ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No orders
              </TableCell>
            </TableRow>
          ) : (
            data?.list.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.description}
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {dayjs(order.created_at).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{order.trade_state}</Badge>
                </TableCell>
                {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </UserBox>
  );
}

export const runtime = "edge";
