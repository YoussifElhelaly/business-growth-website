import { useTranslation } from "react-i18next";
import { Photo } from "./Photo.jsx";
import { SectionHead } from "./SectionHead.jsx";

export function Gallery({ items }) {
  const { t } = useTranslation();

  return (
    <section className="bg-sand" style={{ paddingBlock: "96px 0" }}>
      <div className="wrap">
        <SectionHead
          kicker={t("home.gallery.kicker")}
          title={t("home.gallery.title")}
          lead={t("home.gallery.lead")}
          max={620}
        />
      </div>
      <div
        className="r-mosaic mt-[52px] grid gap-[6px]"
        style={{ gridTemplateColumns: "1.1fr .9fr .9fr 1.1fr", gridTemplateRows: "220px 220px" }}
      >
        <Photo src={items[0]?.image} zoom label={items[0]?.value} style={{ gridRow: "span 2" }} />
        <Photo src={items[1]?.image} zoom label={items[1]?.value} />
        <Photo src={items[2]?.image} zoom label={items[2]?.value} />
        <Photo src={items[3]?.image} zoom label={items[3]?.value} style={{ gridRow: "span 2" }} />
        <Photo src={items[4]?.image} zoom label={items[4]?.value} style={{ gridColumn: "span 2" }} />
      </div>
    </section>
  );
}
