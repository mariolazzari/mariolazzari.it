import { KpisProps } from "./KpiProps";

export function Kpi({ title, icon, value }: KpisProps) {
  return (
    <div className="group flex flex-col items-center gap-4 p-4 rounded-xl shadow-xl w-48 h-40 bg-gradient-to-br from-background to-secondary border-muted hover:border-primary">
      <div className="group-hover:animate-bounce group-hover:text-primary">
        {icon}
      </div>
      <h6 className="text-4xl font-semibold text-center group-hover:text-primary">
        {value}
      </h6>
      <h5 className="text-lg font-semibold group-hover:text-primary">
        {title}
      </h5>
    </div>
  );
}
