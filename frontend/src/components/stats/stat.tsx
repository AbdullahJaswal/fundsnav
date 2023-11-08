type Props = {
  title: string;
  value: number;
  value_decimals?: number;
  subtitle?: string;
};

export default function Stat(props: Props) {
  return (
    <div className="design-temp-1 stats shadow transition-transform duration-300">
      <div className="stat">
        <div className="stat-title text-gradient-primary font-bold">{props.title}</div>
        <div className="stat-value text-inherit font-bold text-lg sm:text-xl">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PKR",
            notation: "standard",
            minimumFractionDigits: props.value_decimals ?? 0,
          }).format(Math.round(props.value))}
        </div>
        {props.subtitle && <div className="stat-desc text-muted font-bold">{props.subtitle}</div>}
      </div>
    </div>
  );
}
