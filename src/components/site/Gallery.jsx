import { useTranslation } from "react-i18next";
import { Photo } from "./Photo.jsx";
import { SectionHead } from "./SectionHead.jsx";

export function Gallery({ images }) {
  const { t } = useTranslation();
  const labels = t("home.gallery.labels", { returnObjects: true });

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
        <Photo src={images[0]} zoom label={labels[0]} style={{ gridRow: "span 2" }} />
        <Photo src={images[1]} zoom label={labels[1]} />
        <Photo src={images[2]} zoom label={labels[2]} />
        <Photo src={images[3]} zoom label={labels[3]} style={{ gridRow: "span 2" }} />
        <Photo src={images[4]} zoom label={labels[4]} style={{ gridColumn: "span 2" }} />
      </div>
    </section>
  );
}
