import { KpisProps } from "./KpiProps";

export function Kpi({ title, icon, value }: KpisProps) {
  return (
    <div className="group flex flex-col items-center gap-4 p-4 rounded-xl shadow-xl w-48 h-40 bg-background border border-muted hover:border-primary">
      <div className="group-hover:animate-bounce">{icon}</div>
      <h6 className="text-4xl font-semibold text-center">{value}</h6>
      <h5 className="text-lg font-semibold">{title}</h5>
    </div>
  );
}
