import { APIResponse } from "@/common/types/APIResponse";
import { Fund } from "@/common/types/mutual_funds/mutualFunds";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";

import { useState } from "react";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import dynamic from "next/dynamic";
const Moment = dynamic(() => import("react-moment"), { ssr: false });

const columnHelper = createColumnHelper<Fund>();

const columns = [
  columnHelper.accessor("name", {
    header: "Fund",
    cell: (fund) => (
      <Link href={`/dashboard/mutual-funds/fund/${fund.row.original.slug}`} className="link link-primary">
        {fund.getValue()}
      </Link>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("amc.name", {
    header: "AMC",
    /* cell: (amc) => (
      <Link href={`/dashboard/mutual-funds/amc/${amc.row.original.amc?.slug}`} className={`link link-secondary`}>
        {amc.getValue()}
      </Link>
    ), */
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("category.name", {
    header: "Category",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("fund_type.name", {
    header: "Type",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("inception_date", {
    header: "Inception",
    cell: (inception_date) => {
      if (!inception_date.getValue()) return "N/A";

      return <Moment format="MMM DD, YYYY">{inception_date.getValue() ?? "N/A"}</Moment>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("last_updated_on", {
    header: "Last Updated",
    cell: (last_updated_on) => {
      if (!last_updated_on.getValue()) return "N/A";

      return <Moment format="MMM DD, YYYY">{last_updated_on.getValue() ?? "N/A"}</Moment>;
    },
    footer: (info) => info.column.id,
  }),
];

type Props = {
  funds: APIResponse<Fund>;
};

export default function FundsTable(props: Props) {
  const data = props.funds.results;
  const [search, setSearch] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: search,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="min-w-max max-w-sm">
          <label className="label">
            <span className="label-text font-bold text-muted mr-2">Page Size:</span>
            <select
              className="select select-sm"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 100, props.funds.count].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize !== props.funds.count ? pageSize : "All"}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="border min-w-fit border-base-300 rounded-lg">
        <table className="table table-zebra table-pin-rows">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="z-auto">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="truncate font-bold w-1/6">
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "flex flex-row cursor-pointer select-none hover:text-base-content"
                          : "flex flex-row",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: (
                          <span className="ml-1 text-success flex items-center">
                            <BsFillCaretUpFill />
                          </span>
                        ),
                        desc: (
                          <span className="ml-1 text-error flex items-center">
                            <BsFillCaretDownFill />
                          </span>
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="h-16 font-bold text-ellipsis overflow-hidden drop-shadow-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row gap-2 items-center justify-center">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <AiOutlineDoubleLeft />
          </button>

          <button className="join-item btn" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <AiOutlineLeft />
          </button>

          <button
            className="join-item btn normal-case disabled:bg-base-200 disabled:text-base-content disabled:font-bold"
            disabled
          >
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </button>

          <button className="join-item btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <AiOutlineRight />
          </button>

          <button
            className="join-item btn"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <AiOutlineDoubleRight />
          </button>
        </div>

        <span className="flex items-center">
          <label className="label">
            <span className="label-text text-muted font-bold">Go to page:</span>
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="input input-md input-bordered w-20 ml-2"
              min={1}
              max={table.getPageCount()}
            />
          </label>
        </span>
      </div>
    </>
  );
}
