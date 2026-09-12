import React from "react";

export default function KpisGrid({ kpis }) {
  const getColorClasses = (color) => {
    const map = {
      blue: "border-l-blue-500 text-blue-600 bg-blue-50",
      emerald: "border-l-emerald-500 text-emerald-600 bg-emerald-50",
      amber: "border-l-amber-500 text-amber-600 bg-amber-50",
      rose: "border-l-rose-500 text-rose-600 bg-rose-50",
      green: "border-l-green-500 text-green-600 bg-green-50",
    };
    return map[color] || map.blue;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {kpis.map((kpi, idx) => {
        const colors = getColorClasses(kpi.color);
        return (
          <div
            key={idx}
            className={`bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 border-l-4 ${colors.split(" ")[0]} flex flex-col justify-between`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  {kpi.title}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                  {kpi.value}
                </h3>
              </div>
              <div className={`p-2 rounded-lg ${colors.split(" ")[2]}`}>
                <kpi.icon className={`size-5 ${colors.split(" ")[1]}`} />
              </div>
            </div>
            <p className="text-xs font-medium mt-4 text-slate-400">
              {kpi.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
