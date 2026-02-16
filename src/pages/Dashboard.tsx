import { useEffect, useState, useRef } from "react";
import { getDashboard } from "../service/dashboard.service";
import * as d3 from "d3";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import type { DashboardResponse, User } from "../types/dashboard.type";
import { barColors, donutColors } from "../utils/chart.util";

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const donutRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const loadData = async () => {
    try {
      const res = await getDashboard();
      setData(res);

      // Render charts after data arrives
      renderDonut(res.chartDonut);
      renderBar(res.chartBar);
    } finally {
      setLoading(false);
    }
  };

  const renderDonut = (data: any[]) => {
    if (!donutRef.current) return;

    d3.select(donutRef.current).selectAll("*").remove();

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(donutRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(donutColors);

    const pie = d3.pie<any>().value((d) => d.value);

    const arc = d3
      .arc<any>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => color(String(i)));
  };

  const renderBar = (data: any[]) => {
    if (!barRef.current) return;

    d3.select(barRef.current).selectAll("*").remove();

    const width = 350;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const svg = d3
      .select(barRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name)!)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .attr("fill", (_, i) => barColors[i % barColors.length]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  };

  useEffect(() => {
    loadData();
  }, []);


  /* ================= TABLE CONFIG ================= */

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      width: 70,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      renderCell: (params) => `@${params.value}`,
    },
  ];

  const rows =
    data?.tableUsers.map((user: User, index: number) => ({
      id: index + 1,
      ...user,
    })) || [];

  /* ================= RENDER ================= */

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* ================= OVERVIEW ================= */}
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="border border-slate-300 rounded-lg shadow">
            <div className="px-4 py-2 bg-slate-100">Donut Chart</div>
            <div
              ref={donutRef}
              className="h-64 flex justify-center items-center"></div>
          </div>

          <div className="border border-slate-300 rounded-lg shadow">
            <div className="px-4 py-2 bg-slate-100">Bar Chart</div>
            <div ref={barRef} className="h-64 flex justify-center items-center"></div>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div>
        <h1 className="text-2xl font-semibold">User List</h1>

        <Box sx={{ height: 400, width: "100%", mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}
