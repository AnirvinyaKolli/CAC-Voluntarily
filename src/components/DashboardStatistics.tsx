import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CompletedOpportunity } from "../UserData";

interface DashboardStatisticsProps {
  totalHours: number;
  completedEvents: number;
  upcomingEvents: number;
  completionRecords: CompletedOpportunity[];
}

export default function DashboardStatistics({
  totalHours,
  completedEvents,
  upcomingEvents,
  completionRecords,
}: DashboardStatisticsProps) {
  const statistics = [
    { label: "Total hours", value: totalHours, detail: "volunteer hours" },
    { label: "Events completed", value: completedEvents, detail: "completed events" },
    { label: "Upcoming events", value: upcomingEvents, detail: "events signed up for" },
  ];

  const hoursByDay = new Map<string, number>();
  completionRecords.forEach((record) => {
    const storedDate = record.completedAt as Date & { toDate?: () => Date };
    const completedAt = typeof storedDate?.toDate === "function"
      ? storedDate.toDate()
      : storedDate instanceof Date
        ? storedDate
        : null;
    if (!completedAt || !Number.isFinite(completedAt.getTime()) || !Number.isFinite(record.hours)) return;

    const day = [
      completedAt.getFullYear(),
      String(completedAt.getMonth() + 1).padStart(2, "0"),
      String(completedAt.getDate()).padStart(2, "0"),
    ].join("-");
    hoursByDay.set(day, (hoursByDay.get(day) ?? 0) + record.hours);
  });

  const sortedDays = [...hoursByDay.entries()].sort(([dayA], [dayB]) => dayA.localeCompare(dayB));
  let runningTotal = 0;
  const chartData = sortedDays.map(([day, hours]) => {
    runningTotal += hours;
    const [year, month, date] = day.split("-").map(Number);
    return {
      date: new Date(year, month - 1, date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      totalHours: runningTotal,
    };
  });
  if (chartData.length > 0) {
    chartData.unshift({ date: "Start", totalHours: 0 });
  }

  return (
    <section aria-labelledby="dashboard-statistics-heading" className="mt-12 sm:mt-16">
      <div className="mb-4">
        <h2 id="dashboard-statistics-heading" className="text-xl font-bold text-[#020079] sm:text-2xl">
          Your statistics
        </h2>
        <p className="mt-1 text-sm text-gray-500">A snapshot of your volunteering activity.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statistics.map((statistic) => (
          <article key={statistic.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-medium text-gray-500">{statistic.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#020079]">{statistic.value}</p>
            <p className="mt-1 text-sm text-gray-500">{statistic.detail}</p>
          </article>
        ))}
      </div>
      <article className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-[#020079]">Volunteer hours over time</h3>
          <p className="mt-1 text-sm text-gray-500">Cumulative hours from your completed events.</p>
        </div>
        {chartData.length > 1 ? (
          <div className="h-72 w-full" aria-label="Line graph of cumulative volunteer hours over time">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis allowDecimals domain={[0, "auto"]} tick={{ fill: "#6b7280", fontSize: 12 }} width={42} />
                <Tooltip formatter={(value) => [`${value} hours`, "Total hours"]} />
                <Line
                  type="monotone"
                  dataKey="totalHours"
                  name="Total hours"
                  stroke="#020079"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#020079" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="flex h-48 items-center justify-center text-center text-sm text-gray-500">
            Complete an event and log your hours to start your graph.
          </p>
        )}
      </article>
    </section>
  );
}
