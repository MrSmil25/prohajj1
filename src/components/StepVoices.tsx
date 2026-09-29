import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calculator, Heart } from "lucide-react";
import { useI18n } from "@/context/i18n";
import family from "@/assets/story-family.jpg";
import mother from "@/assets/story-mother.jpg";
import groceries from "@/assets/story-groceries.jpg";

// Creator archetypes only. Real creator names live in /research as concept candidates,
// never shown here as endorsements.
const VOICES = [
  {
    layer: "FEEL", tag: "MAKE ME FEEL", icon: Heart, image: mother,
    archetype: { id: "Kreator hiburan keluarga", en: "Family entertainment creator" },
    content: "STEP for Parents",
    purpose: { id: "Persiapan haji terasa dekat lewat hubungan orang tua dan anak yang apa adanya.", en: "Hajj preparation feels close through honest parent–child moments." },
  },
  {
    layer: "MEANING", tag: "MAKE IT MEANINGFUL", icon: BookOpen, image: family,
    archetype: { id: "Pendidik agama muda yang relatable", en: "Young, relatable religious educator" },
    content: "STEP Talks",
    purpose: { id: "“Harus nunggu kaya dulu untuk mulai mempersiapkan haji?” — niat, persiapan, dan langkah kecil yang konsisten.", en: "“Do I have to be rich before I start preparing for Hajj?” — intention, preparation and small consistent steps." },
  },
  {
    layer: "ACTION", tag: "MAKE ME BELIEVE", icon: Calculator, image: groceries,
    archetype: { id: "Edukator keuangan & karier", en: "Personal finance & career educator" },
    content: { id: "Rp10.000 beneran ngaruh?", en: "Can Rp10,000 actually matter?" },
    purpose: { id: "Simulasi STEP menunjukkan bagaimana kebiasaan kecil bertumbuh dari waktu ke waktu.", en: "STEP simulations show how small habits add up over time." },
  },
] as const;

export function StepVoices() {
  const { pick } = useI18n();
  return (
    <section>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--emerald)]">STEP Voices</p>
      <h2 className="mt-1 text-2xl font-extrabold text-primary">{pick({ id: "Beda cerita. Satu tujuan.", en: "Different stories. One meaningful destination." })}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {VOICES.map((v) => (
          <article key={v.layer} className="surface-card overflow-hidden">
            <div className="relative h-36">
              <img src={v.image} alt="" loading="lazy" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
              <span className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-white">
                <v.icon className="size-4" /> {v.layer}
              </span>
            </div>
            <div className="p-5">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--emerald)]">{v.tag}</p>
              <h3 className="mt-1 text-sm font-extrabold text-primary">{pick(v.archetype)}</h3>
              <p className="mt-1 text-xs font-bold text-muted-foreground">{typeof v.content === "string" ? v.content : pick(v.content)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{pick(v.purpose)}</p>
            </div>
          </article>
        ))}
      </div>
      <Link to="/step" className="navy-card mt-3 flex items-center justify-between gap-3 p-5">
        <div className="relative">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--emerald)]">STEP · MAKE ME START</p>
          <p className="mt-1 text-base font-extrabold text-white">{pick({ id: "Semua cerita mengarah ke satu langkah: mulai.", en: "Every story leads to one step: starting." })}</p>
        </div>
        <ArrowRight className="relative size-5 shrink-0 text-white" />
      </Link>
      <p className="mt-2 text-[11px] text-muted-foreground">
        {pick({ id: "Arketipe kreator adalah konsep riset, bukan kemitraan atau endorsement yang sudah dikonfirmasi.", en: "Creator archetypes are research concepts, not confirmed partnerships or endorsements." })}
      </p>
    </section>
  );
}
