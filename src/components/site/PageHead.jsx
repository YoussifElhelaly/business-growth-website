import { Photo } from "./Photo.jsx";

export function PageHead({ title, kicker, lead, image }) {
  return (
    <section className="relative flex min-h-[360px] items-end overflow-hidden bg-navy">
      <Photo src={image} fill label="صورة الصفحة" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to left,rgba(23,28,40,.9),rgba(23,28,40,.55))" }}
      />
      <div className="wrap on-dark relative w-full" style={{ paddingBlock: "84px 56px" }}>
        <span className="eyebrow on-dark">{kicker}</span>
        <h1 className="d2 mt-4 max-w-[820px] text-text-on-dark">{title}</h1>
        {lead && <p className="lead mt-4 max-w-[640px]">{lead}</p>}
      </div>
    </section>
  );
}
