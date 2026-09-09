import clsx from "clsx";

export function SectionHead({ kicker, title, lead, align = "start", onDark, max = 680, className = "", style }) {
  return (
    <div
      className={clsx(align === "center" && "mx-auto text-center", className)}
      style={{ maxWidth: max, ...style }}
    >
      {kicker && <span className={clsx("eyebrow", onDark && "on-dark")}>{kicker}</span>}
      <h2 className={clsx("h2 mt-[14px]", onDark && "text-text-on-dark")}>{title}</h2>
      {lead && <p className="lead mt-4">{lead}</p>}
    </div>
  );
}
