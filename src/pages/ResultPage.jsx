import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  if (!result)
    return (
      <div className="text-white min-h-screen flex items-center justify-center bg-blue-900">
        <p>No result found. Please generate estimation again.</p>
      </div>
    );

  const estimationData = result.estimation_table || [];
  const costData = result.cost_estimation_table || [];

  // ---------------------------------
  // 🔥 Generate dynamic columns for estimation table
  // ---------------------------------
  const estimationColumns = useMemo(() => {
    if (!estimationData.length) return [];

    const keys = Object.keys(estimationData[0]);

    return keys.map((key) => ({
      accessorKey: key,
      header: key,
    }));
  }, [estimationData]);

  // ---------------------------------
  // 🔥 Generate dynamic columns for cost table
  // ---------------------------------
  const costColumns = useMemo(() => {
    if (!costData.length) return [];

    const keys = Object.keys(costData[0]);

    return keys.map((key) => ({
      accessorKey: key,
      header: key,
    }));
  }, [costData]);

  // ---------------------------------
  // 🔥 React Table Instances
  // ---------------------------------
  const estimationTable = useReactTable({
    data: estimationData,
    columns: estimationColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const costTable = useReactTable({
    data: costData,
    columns: costColumns,
    getCoreRowModel: getCoreRowModel(),
  });

return (
  <div className="min-h-screen bg-gray-900 text-white py-6">
    <Header />
    <div className="px-8">
      {/* Technique Info */}
      <div className="mt-20">
        <div className="inline-block px-6 py-3 rounded-xl bg-gray-800/80 border border-white/10">
          <p className="text-xs opacity-70">Estimation Technique</p>
          <p className="text-sm font-semibold">
            {result?.estimation_technique || "Use Case Based"}
          </p>
        </div>
      </div>

      {/* Effort Table */}
      <div className="bg-[#0E1A2B] mt-4 p-8 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.06)] backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-6">Effort Estimation</h2>

        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-max w-full border border-gray-600/40 text-white rounded-lg">
            <thead className="bg-gradient-to-r from-gray-800/90 to-gray-700/90">
              {estimationTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-5 py-3 border-b border-gray-600 text-left uppercase tracking-wide text-sm font-semibold"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {estimationTable.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-700/60 hover:bg-gray-700/20 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-5 py-3 border-gray-700 whitespace-nowrap"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Cost Table */}
      <div className="bg-[#0E1A2B] mt-12 p-8 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.06)] backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-6">Cost Estimation</h2>

        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-max w-full border border-gray-600/40 text-white rounded-lg">
            <thead className="bg-gradient-to-r from-gray-800/90 to-gray-700/90">
              {costTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-5 py-3 border-b border-gray-600 text-left uppercase tracking-wide text-sm font-semibold"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {costTable.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-700/60 hover:bg-gray-700/20 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-5 py-3 border-gray-700 whitespace-nowrap"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* CTA Bottom Right */}
      <div className="flex justify-end mt-7">
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-400 text-black font-semibold py-3 px-8 rounded-lg cursor-pointer hover:bg-yellow-300 transition shadow-md"
        >
          ← Generate Again
        </button>
      </div>
    </div>
  </div>
);


};

export default ResultPage;
