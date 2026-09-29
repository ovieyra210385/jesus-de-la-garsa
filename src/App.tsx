import { useState, useRef, useEffect } from "react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Archivo+Black&family=Inter:wght@300;400;500;600&display=swap";

const SHOW_IMAGE_IDS = true; // pon false cuando ya no necesites ver los ids

// Mapa de imágenes reales. Vacío hasta que subas fotos a /src/assets/ con nombres limpios.
// Para añadir una foto: sube el archivo y descomenta la línea correspondiente.
const IMAGE_MAP: Record<string, string> = {
  // "cannes-01": new URL("./assets/cannes-01.jpg", import.meta.url).href,
  // "cannes-02": new URL("./assets/cannes-02.jpg", import.meta.url).href,
  // "intermoda-01": new URL("./assets/intermoda-01.jpg", import.meta.url).href,
};

const siteData = {
  email: "hola@jesusdelagarsa.com",
};

const translations = {
  es: {
    nav: { colecciones:"Colecciones", vestuario:"Vestuario", prensa:"Prensa", sobre:"Sobre mí", contacto:"Contacto", cta:"Hablemos" },
    hero: { line:"Alta costura mexicana desde Guanajuato para el mundo.", hitos:["Festival de Cannes 2026 · House of Magnum","Intermoda 85 · Supernova","Primer diseñador latinoamericano en La Croisette"] },
    manifiesto: { quote:"MORE IS MORE AND LESS IS A BORE", text:"Diseño vestuario para quienes no pasan desapercibidos. Volumen escultural, bordado a mano y cristales: la artesanía mexicana llevada al extremo." },
    colecciones: { label:"Colecciones", title:"Tres propuestas", magnumConcept:"Tonos chocolate, acabados brillantes, corsets estructurados, siluetas escultóricas, bordado hecho a mano y cristales.", supernovaConcept:"La mariposa como símbolo de la transformación y la evolución.", espumaConcept:"Piezas de silueta ligera y veraniega." },
    cannes: { number:"01", title:"Festival de Cannes", subtitle:"La Croisette · House of Magnum", ficha:["Año — 2026","Ciudad — Cannes, Francia","Evento — House of Magnum","Curaduría — Law Roach","Cierre de pasarela — Heidi Klum","Salidas — 6 looks completos","Colaboradores — DANTE (calzado), TTEN (joyería)","PR — Azahel Marmolejo"], paragraph:"Por primera vez, un diseñador mexicano y latinoamericano presentó una colección dentro del Festival de Cannes. Entre nombres de Francia, España, Alemania, Turquía, Reino Unido, Polonia y Países Bajos, Jesús de la Garsa fue el único representante latinoamericano invitado.", dato:"El primer diseñador latinoamericano en desfilar en La Croisette.", link:"Ver la colección →" },
    intermoda: { number:"02", title:"Intermoda 85", subtitle:"Fashion Space · Guadalajara", ficha:["Año — 2026","Ciudad — Guadalajara, México","Evento — Intermoda 85 · Fashion Space","Rol — Apertura de Fashion Space","Colección — Supernova","Colaborador — DANTE (calzado)"], paragraph:"La apertura de Fashion Space en la edición 85 de Intermoda, el encuentro de moda más importante de América Latina, con más de mil marcas expositoras.", dato:"Supernova: la mariposa como símbolo de la transformación y la evolución.", link:"Ver la colección →", quoteButterfly:"Every butterfly was once a caterpillar" },
    vestuario: { label:"Vestuario", title:"MÁS DE 100 CELEBRIDADES", subtitle:"De Guanajuato al mundo.", text:"Sus piezas han vestido a figuras de la música, la moda y el entretenimiento en México y en el extranjero. K-pop, pop latino, supermodelos y alfombra roja internacional: el mismo sello artesanal, llevado a cada escenario.", link:"Ver todo el vestuario →", items:[
      {name:"BLACKPINK", meta:"Música · Internacional", desc:"Jisoo, Lisa, Jennie y Rosé. Vestuario para el videoclip \"GO\", en el regreso musical del grupo."},
      {name:"Kourtney Kardashian", meta:"Televisión · Internacional", desc:"Shorts de la colección Espuma de Mar, vistos en el avance de su serie en Hulu."},
      {name:"Shakira", meta:"Música · Internacional", desc:"Creaciones del diseñador guanajuatense."},
      {name:"Danna Paola", meta:"Música · México", desc:"Diseños femeninos y elegantes para la cantante y actriz mexicana."},
      {name:"Belinda", meta:"Música · México", desc:"Una de las grandes exponentes del pop mexicano vestida por la firma."},
      {name:"Coco Rocha", meta:"Pasarela · Internacional", desc:"La supermodelo internacional ha modelado y usado sus piezas en pasarelas y editoriales."},
      {name:"Chiara Ferragni", meta:"Moda · Internacional", desc:"La empresaria y referente de moda italiana."}
    ]},
    sobreTeaser: { title:"Guanajuato como punto de partida", text:"Jesús de la Garsa diseña desde el detalle artesanal y el volumen. Su trabajo cruza la alta costura con una mirada contemporánea y maximalista, y ha llevado la artesanía mexicana a escenarios internacionales.", link:"Leer más →", less:"Leer menos ←", fullBio:["Jesús de la Garsa diseña desde Guanajuato para escenarios internacionales. Su propuesta parte del detalle artesanal —el bordado hecho a mano, la aplicación de cristales, la corsetería estructurada— y lo lleva a siluetas escultóricas de gran presencia.","En 2026 se convirtió en el primer diseñador mexicano y latinoamericano en presentar una colección dentro del Festival de Cannes, en una pasarela en la playa de La Croisette como parte de House of Magnum, evento curado por Law Roach y con Heidi Klum cerrando el desfile. Fue el único representante latinoamericano en una selección de diseñadores de Francia, España, Alemania, Turquía, Reino Unido, Polonia y Países Bajos, y presentó seis salidas completas.","Ese mismo año abrió Fashion Space en Intermoda 85, en Guadalajara, con la colección Supernova, donde la mariposa funciona como símbolo de la transformación y la evolución.","Su trabajo ha vestido a más de 100 celebridades nacionales e internacionales. BLACKPINK llevó sus diseños en el videoclip 'GO'; Kourtney Kardashian usó piezas de su colección Espuma de Mar; Shakira, Danna Paola y Belinda han lucido sus creaciones, y figuras de la moda global como Coco Rocha y Chiara Ferragni han modelado y usado sus piezas en pasarelas y editoriales."] },
    atelier: { label:"Atelier", title:"Cómo trabajamos", items:[
      {n:"01", t:"Alta costura y hecho a medida", d:"Piezas únicas construidas sobre el cuerpo, con bordado y cristal aplicados a mano."},
      {n:"02", t:"Vestuario para celebridades y alfombra roja", d:"Diseño de looks para eventos, premieres y pasarelas internacionales."},
      {n:"03", t:"Colecciones de autor y pasarela", d:"Desarrollo de colección completa: concepto, siluetas, materiales y desfile."},
      {n:"04", t:"Colaboraciones de marca", d:"Cápsulas y piezas especiales con firmas de calzado, joyería y moda."}
    ]},
    prensa: { q1:"Así evoluciona la moda mexicana contemporánea", m1:"Forbes Life", q2:"Moda mexicana en Cannes con Jesús de la Garsa", m2:"Anna Fusoni" },
    cta: { title:"Colaboraciones, prensa y vestuario", text:"Para solicitudes de vestuario, colaboraciones de marca o cobertura de prensa.", btn:"Contacto", note:"PR — Azahel Marmolejo", wardrobeQuestion:"¿Buscas vestuario para un evento, videoclip o alfombra roja?" },
    footer: { navTitle:"Navegación", contactTitle:"Contacto", pr:"PR — Azahel Marmolejo" }
  },
  en: {
    nav: { colecciones:"Collections", vestuario:"Wardrobe", prensa:"Press", sobre:"About", contacto:"Contact", cta:"Let's talk" },
    hero: { line:"Mexican haute couture from Guanajuato for the world.", hitos:["Cannes Film Festival 2026 · House of Magnum","Intermoda 85 · Supernova","First Latin American designer on La Croisette"] },
    manifiesto: { quote:"MORE IS MORE AND LESS IS A BORE", text:"I design wardrobe for those who refuse to go unnoticed. Sculptural volume, hand embroidery and crystals: Mexican craftsmanship taken to the extreme." },
    colecciones: { label:"Collections", title:"Three proposals", magnumConcept:"Chocolate tones, glossy finishes, structured corsets, sculptural silhouettes, hand embroidery and crystal appliqués.", supernovaConcept:"The butterfly as a symbol of transformation and evolution.", espumaConcept:"Light, summery silhouette pieces." },
    cannes: { number:"01", title:"Cannes Film Festival", subtitle:"La Croisette · House of Magnum", ficha:["Year — 2026","City — Cannes, France","Event — House of Magnum","Curation — Law Roach","Runway closing — Heidi Klum","Looks — 6 full looks","Collaborators — DANTE (footwear), TTEN (jewelry)","PR — Azahel Marmolejo"], paragraph:"For the first time, a Mexican and Latin American designer presented a collection inside the Cannes Film Festival. Among names from France, Spain, Germany, Turkey, United Kingdom, Poland and the Netherlands, Jesús de la Garsa was the only Latin American representative invited.", dato:"The first Latin American designer to walk La Croisette.", link:"View collection →" },
    intermoda: { number:"02", title:"Intermoda 85", subtitle:"Fashion Space · Guadalajara", ficha:["Year — 2026","City — Guadalajara, Mexico","Event — Intermoda 85 · Fashion Space","Role — Opening of Fashion Space","Collection — Supernova","Collaborator — DANTE (footwear)"], paragraph:"The opening of Fashion Space at the 85th edition of Intermoda, the most important fashion gathering in Latin America, with over a thousand exhibiting brands.", dato:"Supernova: the butterfly as symbol of transformation and evolution.", link:"View collection →", quoteButterfly:"Every butterfly was once a caterpillar" },
    vestuario: { label:"Wardrobe", title:"OVER 100 CELEBRITIES", subtitle:"From Guanajuato to the world.", text:"His pieces have dressed figures from music, fashion and entertainment in Mexico and abroad. K-pop, global pop, supermodels and international red carpet: the same artisanal signature, brought to every stage.", link:"View all wardrobe →", items:[
      {name:"BLACKPINK", meta:"Music · International", desc:"Jisoo, Lisa, Jennie and Rosé. Wardrobe for the \"GO\" music video, on the group's musical return."},
      {name:"Kourtney Kardashian", meta:"TV · International", desc:"Shorts from the Espuma de Mar collection, seen in the trailer for her Hulu series."},
      {name:"Shakira", meta:"Music · International", desc:"Creations by the Guanajuato designer."},
      {name:"Danna Paola", meta:"Music · Mexico", desc:"Feminine and elegant designs for the Mexican singer and actress."},
      {name:"Belinda", meta:"Music · Mexico", desc:"One of the great exponents of Mexican pop dressed by the house."},
      {name:"Coco Rocha", meta:"Runway · International", desc:"The international supermodel has modeled and worn his pieces on runways and editorials."},
      {name:"Chiara Ferragni", meta:"Fashion · International", desc:"The Italian entrepreneur and fashion reference."}
    ]},
    sobreTeaser: { title:"Guanajuato as starting point", text:"Jesús de la Garsa designs from artisanal detail and volume. His work bridges haute couture with a contemporary, maximalist gaze, and has taken Mexican craftsmanship to international stages.", link:"Read more →", less:"Show less ←", fullBio:["Jesús de la Garsa designs from Guanajuato for international stages. His proposal starts from artisanal detail —hand embroidery, crystal application, structured corsetry— and brings it to sculptural silhouettes with strong presence.","In 2026 he became the first Mexican and Latin American designer to present a collection inside the Cannes Film Festival, on a runway on La Croisette beach as part of House of Magnum, event curated by Law Roach with Heidi Klum closing the show. He was the only Latin American representative in a selection of designers from France, Spain, Germany, Turkey, United Kingdom, Poland and the Netherlands, and presented six full looks.","That same year he opened Fashion Space at Intermoda 85, in Guadalajara, with the Supernova collection, where the butterfly works as a symbol of transformation and evolution.","His work has dressed over 100 national and international celebrities. BLACKPINK wore his designs in the 'GO' video; Kourtney Kardashian wore pieces from his Espuma de Mar collection; Shakira, Danna Paola and Belinda have worn his creations, and global fashion figures like Coco Rocha and Chiara Ferragni have modeled and worn his pieces on runways and editorials."] },
    atelier: { label:"Atelier", title:"How we work", items:[
      {n:"01", t:"Haute couture and made-to-measure", d:"One-of-a-kind pieces built on the body, with hand-applied embroidery and crystal."},
      {n:"02", t:"Celebrity and red carpet wardrobe", d:"Look design for events, premieres and international runways."},
      {n:"03", t:"Author collections and runway", d:"Full collection development: concept, silhouettes, materials and show."},
      {n:"04", t:"Brand collaborations", d:"Capsules and special pieces with footwear, jewelry and fashion brands."}
    ]},
    prensa: { q1:"How contemporary Mexican fashion evolves", m1:"Forbes Life", q2:"Mexican fashion in Cannes with Jesús de la Garsa", m2:"Anna Fusoni" },
    cta: { title:"Collaborations, press and wardrobe", text:"For wardrobe requests, brand collaborations or press coverage.", btn:"Contact", note:"PR — Azahel Marmolejo", wardrobeQuestion:"Looking for wardrobe for an event, music video or red carpet?" },
    footer: { navTitle:"Navigation", contactTitle:"Contact", pr:"PR — Azahel Marmolejo" }
  }
} as const;

type Lang = "es" | "en";

type ImageSlotProps = {
  id: string;
  ratio?: string;
  className?: string;
  alt?: string;
};

function ImageSlot({ id, ratio = "3/4", className = "", alt }: ImageSlotProps) {
  const realSrc = IMAGE_MAP[id];
  const hasReal = !!realSrc;
  return (
    <div
      style={{ backgroundColor: '#D6D2CB', aspectRatio: hasReal ? undefined : ratio }}
      className={`relative w-full overflow-hidden ${className} ${hasReal ? 'group' : ''}`}
      aria-label={alt || id}
      role="img"
    >
      {hasReal ? (
        <>
          <img
            src={realSrc}
            alt={alt || id}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] group-hover:brightness-[1.05]"
            loading="lazy"
          />
          {SHOW_IMAGE_IDS && (
            <span
              className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] leading-none select-none pointer-events-none bg-black/40 backdrop-blur px-2 py-1 text-white"
              style={{ fontFamily: 'Archivo Black, Inter, sans-serif' }}
            >
              {id}
            </span>
          )}
        </>
      ) : (
        <>
          <div style={{ aspectRatio: ratio }} className="w-full h-full" />
          {SHOW_IMAGE_IDS && (
            <span
              className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] leading-none select-none pointer-events-none"
              style={{ color: '#6B6760', fontFamily: 'Archivo Black, Inter, sans-serif' }}
            >
              {id}
            </span>
          )}
        </>
      )}
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "-40px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[28px]"}`}
      style={{ transitionDelay: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
}

function useParallax(ref: React.RefObject<HTMLElement | null>) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!ref.current) { ticking = false; return; }
        const rect = ref.current.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const progress = (viewportH - rect.top) / (viewportH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        setOffset((clamped - 0.5) * 80);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
  return offset;
}

type ModalType = null | "magnum" | "supernova" | "vestuario";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const [langTick, setLangTick] = useState(0);
  const [modal, setModal] = useState<ModalType>(null);
  const [expanded, setExpanded] = useState(false);

  const cannesRef = useRef<HTMLDivElement>(null);
  const intermodaRef = useRef<HTMLDivElement>(null);
  const cannesParallax = useParallax(cannesRef);
  const intermodaParallax = useParallax(intermodaRef);

  const t = translations[lang];

  const navLinks = [
    { label: t.nav.colecciones, href: "#colecciones" },
    { label: t.nav.vestuario, href: "#vestuario" },
    { label: t.nav.prensa, href: "#prensa" },
    { label: t.nav.sobre, href: "#sobre-mi" },
    { label: t.nav.contacto, href: "#contacto" },
  ];

  const celebLayout = [
    { id: "celeb-blackpink", ratio: "3/4", col: "col-span-12 md:col-span-6", h: "h-[72vh] md:h-[86vh]" },
    { id: "celeb-kourtney", ratio: "4/5", col: "col-span-12 md:col-span-4 md:col-start-8 md:mt-24", h: "h-[58vh]" },
    { id: "celeb-shakira", ratio: "3/4", col: "col-span-12 md:col-span-5 md:mt-[-8vh]", h: "h-[64vh]" },
    { id: "celeb-danna", ratio: "3/4", col: "col-span-12 md:col-span-3 md:col-start-7 md:mt-16", h: "h-[52vh]" },
    { id: "celeb-belinda", ratio: "4/5", col: "col-span-12 md:col-span-4 md:col-start-2", h: "h-[56vh]" },
    { id: "celeb-cocorocha", ratio: "3/4", col: "col-span-12 md:col-span-6 md:col-start-6 md:mt-12", h: "h-[70vh]" },
    { id: "celeb-chiara", ratio: "3/4", col: "col-span-12 md:col-span-3 md:col-start-2 md:mt-[-16vh]", h: "h-[48vh]" },
  ];

  const celebs = t.vestuario.items.map((item, i) => ({
    ...item,
    ...(celebLayout[i] || celebLayout[0]),
  }));

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#0E0E0E] text-[#F5F3EF] antialiased selection:bg-[#8C8880]/30 selection:text-white overflow-x-hidden overflow-x-clip w-full max-w-full">
      <style>{`@import url('${FONT_URL}');
        html{scroll-behavior:smooth}
        body{overflow-x:hidden}
        .outline-num{ -webkit-text-stroke:1px currentColor; color:transparent; }
        .outline-light{ -webkit-text-stroke:1px rgba(245,243,239,0.2); }
        .outline-dark{ -webkit-text-stroke:1px rgba(14,14,14,0.15); }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-thumb{background:#8C8880}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0E0E0E]/80 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10 h-[64px]">
          <a href="#" className="font-['Playfair_Display'] tracking-[0.18em] text-[13px] md:text-[14px] font-bold text-[#F5F3EF]">JESÚS DE LA GARSA</a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="font-['Inter'] uppercase text-[11px] tracking-[0.22em] text-[#8C8880] hover:text-[#F5F3EF] transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 font-['Inter'] text-[11px] tracking-[0.2em] uppercase">
              <button onClick={() => { setLang("es"); setLangTick(Date.now()); }} data-tick={langTick} className={`${lang === "es" ? "text-[#F5F3EF] underline underline-offset-4 decoration-[#8B1A1A]" : "text-[#8C8880]"} transition`}>ES</button>
              <span className="text-[#8C8880]/40">|</span>
              <button onClick={() => { setLang("en"); setLangTick(Date.now()); }} data-tick={langTick} className={`${lang === "en" ? "text-[#F5F3EF] underline underline-offset-4 decoration-[#8B1A1A]" : "text-[#8C8880]"} transition`}>EN</button>
            </div>
            <a href="#contacto" className="border border-[#F5F3EF]/20 px-5 py-2 font-['Inter'] uppercase text-[11px] tracking-[0.2em] hover:bg-[#F5F3EF] hover:text-black transition-colors">{t.nav.cta}</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5" aria-label="Menu">
            <span className={`h-[1px] bg-[#F5F3EF] block transition-all ${menuOpen ? "rotate-45 translate-y-[3px]" : "w-6"}`} />
            <span className={`h-[1px] bg-[#F5F3EF] block transition-all ${menuOpen ? "-rotate-45 -translate-y-[3px]" : "w-4"}`} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0E0E0E] md:hidden flex flex-col animate-[fadeIn_0.3s_ease]">
          <div className="flex-1 flex flex-col justify-center px-8 pt-20">
            {navLinks.map((l, i) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="font-['Playfair_Display'] text-[12vw] leading-[0.85] tracking-[-0.02em] py-2 border-b border-white/5 opacity-0 animate-[slideUp_0.6s_ease_forwards]" style={{ animationDelay: `${i * 0.08 + 0.1}s` }}>{l.label}</a>
            ))}
            <div className="mt-12 flex items-center gap-8">
              <a href="#contacto" onClick={() => setMenuOpen(false)} className="bg-[#F5F3EF] text-black px-10 py-5 font-['Inter'] uppercase text-[11px] tracking-[0.2em]">{t.nav.cta}</a>
              <div className="flex gap-3 font-['Inter'] text-[11px] tracking-widest uppercase">
                <button onClick={() => { setLang("es"); setLangTick(Date.now()); setMenuOpen(false); }} data-tick={langTick} className={lang === "es" ? "text-white underline" : "text-[#8C8880]"}>ES</button>
                <button onClick={() => { setLang("en"); setLangTick(Date.now()); setMenuOpen(false); }} data-tick={langTick} className={lang === "en" ? "text-white underline" : "text-[#8C8880]"}>EN</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="relative h-[100vh] w-full overflow-hidden max-w-full">
        <div className="absolute inset-0">
          <ImageSlot id="cannes-01" ratio="16/9" className="h-full w-full !aspect-auto" alt="Look 01 de Cannes, pasarela en La Croisette, silueta escultórica tono chocolate" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10 max-w-[1600px] mx-auto pt-20 overflow-hidden">
          <h1 className="font-['Playfair_Display'] font-black text-[#F5F3EF] leading-[0.85] tracking-[-0.04em] animate-[slideUp_1.2s_cubic-bezier(0.25,0.1,0.25,1)_forwards] max-w-full" style={{ fontSize: "clamp(44px, 11vw, 160px)" }}>JESÚS DE<br />LA GARSA</h1>
          <p className="font-['Inter'] text-[14px] md:text-[15px] tracking-wide text-[#F5F3EF]/90 mt-6 max-w-md leading-relaxed opacity-0 animate-[fadeIn_0.8s_ease_0.6s_forwards]">{t.hero.line}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 flex flex-col md:flex-row justify-between px-6 md:px-10 py-4 gap-2 font-['Inter'] text-[10px] uppercase tracking-[0.2em] text-[#8C8880] bg-[#0E0E0E]/40 backdrop-blur-md max-w-full">
          {t.hero.hitos.map((hito) => (<span key={hito}>{hito}</span>))}
        </div>
      </section>

      <section className="bg-[#0E0E0E] py-32 md:py-48 px-6 md:px-10 max-w-[1600px] mx-auto overflow-hidden">
        <FadeUp>
          <h2 className="font-['Playfair_Display'] font-black text-[#F5F3EF] leading-[0.9] tracking-[-0.02em] max-w-6xl" style={{ fontSize: "clamp(36px, 6.5vw, 96px)" }}>
            {t.manifiesto.quote.split(" ").slice(0,3).join(" ")}<br />{t.manifiesto.quote.split(" ").slice(3).join(" ")}
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} className="mt-10">
          <p className="font-['Inter'] text-[13px] md:text-[14px] leading-relaxed tracking-wide max-w-xl text-[#8C8880]">{t.manifiesto.text}</p>
        </FadeUp>
      </section>

      <section id="colecciones" className="bg-[#F5F3EF] text-[#0E0E0E] py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <FadeUp>
            <span className="font-['Archivo_Black'] text-[10px] uppercase tracking-[0.3em] text-[#8C8880]">{t.colecciones.label}</span>
            <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl leading-[0.9] mt-4">{t.colecciones.title}</h2>
          </FadeUp>
          <div className="mt-16 md:mt-24 grid grid-cols-12 gap-6 md:gap-8 items-start">
            <FadeUp className="col-span-12 md:col-span-5 group cursor-pointer">
              <div className="relative overflow-hidden">
                <ImageSlot id="cannes-02" ratio="3/4" alt="Colección Magnum 2026" className="h-[70vh] md:h-[85vh] !aspect-auto transition-transform duration-700 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
                  <span className="font-['Playfair_Display'] text-white text-2xl">Magnum</span>
                </div>
              </div>
              <h3 className="font-['Playfair_Display'] text-3xl mt-5">Magnum (2026)</h3>
              <p className="font-['Inter'] text-[12px] leading-relaxed text-[#8C8880] mt-2 max-w-[36ch]">{t.colecciones.magnumConcept}</p>
            </FadeUp>
            <FadeUp delay={0.15} className="col-span-12 md:col-span-4 md:col-start-7 md:mt-32 group cursor-pointer">
              <div className="relative overflow-hidden">
                <ImageSlot id="intermoda-01" ratio="4/5" alt="Colección Supernova" className="h-[60vh] !aspect-auto transition-transform duration-700 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
                  <span className="font-['Playfair_Display'] text-white text-2xl">Supernova</span>
                </div>
              </div>
              <h3 className="font-['Playfair_Display'] text-3xl mt-5">Supernova (2026)</h3>
              <p className="font-['Inter'] text-[12px] leading-relaxed text-[#8C8880] mt-2 max-w-[32ch]">{t.colecciones.supernovaConcept}</p>
            </FadeUp>
            <FadeUp delay={0.3} className="col-span-12 md:col-span-3 md:col-start-2 md:mt-12 group cursor-pointer">
              <div className="relative overflow-hidden">
                <ImageSlot id="lookbook-01" ratio="3/4" alt="Espuma de Mar" className="h-[50vh] !aspect-auto transition-transform duration-700 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
                  <span className="font-['Playfair_Display'] text-white text-xl">Espuma de Mar</span>
                </div>
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl mt-5">Espuma de Mar</h3>
              <p className="font-['Inter'] text-[12px] leading-relaxed text-[#8C8880] mt-2">{t.colecciones.espumaConcept}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="bg-[#0E0E0E] text-[#F5F3EF] py-24 md:py-36 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 overflow-hidden">
            <span className="font-['Archivo_Black'] text-[24vw] md:text-[18vw] leading-[0.8] outline-num outline-light block select-none">{t.cannes.number}</span>
          </div>
          <FadeUp className="col-span-12 md:col-span-8 -mt-8 md:-mt-16">
            <h2 className="font-['Playfair_Display'] text-[9vw] md:text-[7vw] leading-[0.85] tracking-[-0.03em]">{lang === 'es' ? (<>Festival de<br />Cannes</>) : (<>Cannes<br />Film Festival</>)}</h2>
            <p className="font-['Inter'] uppercase text-[11px] tracking-[0.3em] text-[#8C8880] mt-6">{t.cannes.subtitle}</p>
          </FadeUp>
          <div ref={cannesRef} className="col-span-12 md:col-span-8 mt-12 relative overflow-hidden">
            <div style={{ transform: `translateY(${cannesParallax}px)` }} className="will-change-transform">
              <ImageSlot id="cannes-03" ratio="16/10" alt="Pasarela Cannes 2026" className="!aspect-auto h-[56vw] md:h-[42vw]" />
            </div>
          </div>
          <FadeUp className="col-span-12 md:col-span-3 md:col-start-10 mt-6 md:mt-12">
            <div className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] leading-7 text-[#8C8880] border-l border-white/10 pl-6">
              {t.cannes.ficha.map((f) => {
                const [label, ...rest] = f.split("—");
                return <p key={f}><span className="text-[#F5F3EF]/60">{label}—</span> {rest.join("—").trim()}</p>;
              })}
            </div>
          </FadeUp>
          <FadeUp className="col-span-12 md:col-span-6 mt-12">
            <p className="font-['Inter'] text-[15px] leading-relaxed text-[#F5F3EF]/90 max-w-[54ch]">{t.cannes.paragraph}</p>
            <p className="font-['Playfair_Display'] italic text-3xl md:text-4xl leading-tight mt-10 max-w-[18ch]">{t.cannes.dato}</p>
            <button onClick={() => { setModal('magnum'); requestAnimationFrame(() => scrollToId('colecciones')); }} className="font-['Inter'] text-[11px] uppercase tracking-[0.2em] border-b border-[#8B1A1A] pb-1 mt-10 inline-block hover:text-[#8B1A1A] transition-colors text-left">{t.cannes.link}</button>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#F5F3EF] text-[#0E0E0E] py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 overflow-hidden">
            <span className="font-['Archivo_Black'] text-[24vw] md:text-[18vw] leading-[0.8] outline-num outline-dark block select-none">{t.intermoda.number}</span>
          </div>
          <FadeUp className="col-span-12 md:col-span-7 -mt-6 md:-mt-12">
            <h2 className="font-['Playfair_Display'] text-[8vw] md:text-[5.5vw] leading-[0.85] tracking-[-0.03em]">{t.intermoda.title}</h2>
            <p className="font-['Inter'] uppercase text-[11px] tracking-[0.3em] text-[#8C8880] mt-5">{t.intermoda.subtitle}</p>
          </FadeUp>
          <div ref={intermodaRef} className="col-span-12 md:col-span-7 mt-10 relative overflow-hidden">
            <div style={{ transform: `translateY(${intermodaParallax}px)` }} className="will-change-transform">
              <ImageSlot id="intermoda-02" ratio="16/10" alt="Intermoda 85" className="!aspect-auto h-[54vw] md:h-[36vw]" />
            </div>
          </div>
          <FadeUp className="col-span-12 md:col-span-4 md:col-start-9 mt-6 md:mt-10">
            <div className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] leading-7 text-[#8C8880] border-l border-black/10 pl-6">
              {t.intermoda.ficha.map((f) => {
                const [label, ...rest] = f.split("—");
                return <p key={f}><span className="text-black/60">{label}—</span> {rest.join("—").trim()}</p>;
              })}
            </div>
            <p className="font-['Inter'] text-[14px] leading-relaxed mt-10 max-w-[42ch]">{t.intermoda.paragraph}</p>
            <p className="font-['Playfair_Display'] italic text-2xl md:text-3xl leading-tight mt-8">{t.intermoda.dato}</p>
            <p className="mt-6 text-2xl md:text-3xl font-['Playfair_Display'] italic leading-tight text-[#0E0E0E] border-l-2 border-[#8B1A1A] pl-6">"{t.intermoda.quoteButterfly}"</p>
            <button onClick={() => { setModal('supernova'); requestAnimationFrame(() => scrollToId('colecciones')); }} className="font-['Inter'] text-[11px] uppercase tracking-[0.2em] border-b border-[#8B1A1A] pb-1 mt-8 inline-block hover:text-[#8B1A1A] transition-colors text-left">{t.intermoda.link}</button>
          </FadeUp>
        </div>
      </section>

      <section id="vestuario" className="bg-[#0E0E0E] text-[#F5F3EF] py-24 md:py-40 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <FadeUp>
            <span className="font-['Archivo_Black'] text-[10px] uppercase tracking-[0.3em] text-[#8C8880]">{t.vestuario.label}</span>
            <h2 className="font-['Playfair_Display'] font-black leading-[0.85] tracking-[-0.04em] mt-6" style={{ fontSize: "clamp(36px, 8vw, 112px)" }}>{t.vestuario.title.split(" ").slice(0,2).join(" ")}<br />{t.vestuario.title.split(" ").slice(2).join(" ")}</h2>
            <p className="font-['Inter'] text-sm tracking-wide text-[#8C8880] mt-4">{t.vestuario.subtitle}</p>
            <p className="font-['Inter'] text-[14px] leading-relaxed text-[#8C8880] mt-8 max-w-2xl">{t.vestuario.text}</p>
          </FadeUp>
          <div className="mt-20 grid grid-cols-12 gap-6 md:gap-10 items-start">
            {celebs.map((c, i) => (
              <FadeUp key={c.id} delay={i * 0.05} className={`${c.col} group`}>
                <div className="relative overflow-hidden">
                  <ImageSlot id={c.id} ratio={c.ratio} alt={`${c.name}, ${c.meta}`} className={`${c.h} !aspect-auto transition-transform duration-700 group-hover:scale-[1.03]`} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-end p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="font-['Playfair_Display'] text-white text-xl md:text-2xl">{c.name}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl leading-none">{c.name}</h3>
                  <p className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#8C8880] mt-2">{c.meta}</p>
                  <p className="font-['Inter'] text-[12px] leading-relaxed text-[#8C8880] mt-2 max-w-[38ch]">{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="mt-16">
            <button onClick={() => setModal('vestuario')} className="font-['Inter'] text-[11px] uppercase tracking-[0.2em] border-b border-[#8B1A1A] pb-1 inline-block hover:text-[#8B1A1A] transition-colors text-left">{t.vestuario.link}</button>
          </FadeUp>
        </div>
      </section>

      <div className="bg-[#0E0E0E] border-y border-white/10 py-6 overflow-hidden max-w-full w-full">
        <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite] will-change-transform">
          {[...Array(4)].map((_, dup) => (
            <span key={dup} className="flex items-center shrink-0">
              {["DANTE","TTEN","BLACKPINK","SHAKIRA","KOURTNEY KARDASHIAN","DANNA PAOLA","BELINDA","COCO ROCHA","CHIARA FERRAGNI","House of Magnum","Festival de Cannes","Law Roach","Heidi Klum","Intermoda","ELLE México","Forbes Life"].map((t2) => (
                <span key={t2+dup} className="font-['Archivo_Black'] uppercase text-[12px] tracking-[0.2em] text-[#F5F3EF] mx-6 flex items-center gap-6 shrink-0">{t2} <span className="text-[#8B1A1A]">·</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section id="sobre-mi" className="bg-[#F5F3EF] text-[#0E0E0E] py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">
          <FadeUp className="col-span-12 md:col-span-5">
            <ImageSlot id="portrait-designer-01" ratio="4/5" alt="Retrato Jesús de la Garsa" className="h-[80vh] md:h-[84vh] !aspect-auto" />
          </FadeUp>
          <FadeUp delay={0.2} className="col-span-12 md:col-span-6 md:col-start-7 md:pl-10 mt-2 md:mt-32">
            <h2 className="font-['Playfair_Display'] text-5xl md:text-[56px] leading-[0.9] tracking-[-0.02em]">{lang === 'es' ? (<>Guanajuato como<br />punto de partida</>) : (<>Guanajuato as<br />starting point</>)}</h2>
            <p className="font-['Inter'] text-[14px] leading-relaxed text-[#8C8880] mt-6 max-w-[48ch]">{t.sobreTeaser.text}</p>
            <button onClick={() => setExpanded(!expanded)} className="font-['Inter'] text-[11px] uppercase tracking-[0.2em] border-b border-[#8B1A1A] pb-1 mt-8 inline-block hover:text-[#8B1A1A] transition-colors text-left">{expanded ? t.sobreTeaser.less : t.sobreTeaser.link}</button>
            {expanded && (
              <div className="mt-10 space-y-6 animate-[fadeIn_0.6s_ease] border-t border-black/10 pt-10">
                {t.sobreTeaser.fullBio.map((para, idx) => (
                  <FadeUp key={idx} delay={idx * 0.08}>
                    <p className="font-['Inter'] text-[14px] leading-relaxed text-[#0E0E0E]/80 max-w-[52ch]">{para}</p>
                  </FadeUp>
                ))}
              </div>
            )}
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#0E0E0E] text-[#F5F3EF] py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <FadeUp>
            <span className="font-['Archivo_Black'] text-[10px] uppercase tracking-[0.3em] text-[#8C8880]">{t.atelier.label}</span>
            <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl mt-4 mb-16 leading-[0.9]">{t.atelier.title}</h2>
          </FadeUp>
          <div className="grid grid-cols-12 gap-8">
            {t.atelier.items.map((item, i) => (
              <FadeUp key={item.n} delay={i * 0.08} className="col-span-12 md:col-span-6 border-t border-white/10 pt-8">
                <span className="font-['Archivo_Black'] text-5xl text-[#F5F3EF]/20">{item.n}</span>
                <h3 className="font-['Playfair_Display'] text-2xl md:text-[28px] mt-4 leading-tight max-w-[22ch]">{item.t}</h3>
                <p className="font-['Inter'] text-[12px] text-[#8C8880] mt-3 leading-relaxed max-w-[38ch]">{item.d}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="prensa" className="bg-[#F5F3EF] text-[#0E0E0E] py-24 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-10">
          <FadeUp className="col-span-12 md:col-span-6 border-l-2 border-[#8B1A1A] pl-8">
            <p className="font-['Playfair_Display'] italic text-3xl md:text-5xl leading-[1.1]">“{t.prensa.q1}”</p>
            <span className="font-['Archivo_Black'] text-[11px] uppercase tracking-[0.22em] mt-6 block">{t.prensa.m1}</span>
          </FadeUp>
          <FadeUp delay={0.15} className="col-span-12 md:col-span-6 border-l-2 border-[#8B1A1A] pl-8">
            <p className="font-['Playfair_Display'] italic text-3xl md:text-5xl leading-[1.1]">“{t.prensa.q2}”</p>
            <span className="font-['Archivo_Black'] text-[11px] uppercase tracking-[0.22em] mt-6 block">{t.prensa.m2}</span>
          </FadeUp>
        </div>
      </section>

      <section id="contacto" className="bg-[#0E0E0E] text-[#F5F3EF] py-32 md:py-48 text-center px-6 overflow-hidden">
        <FadeUp>
          <h2 className="font-['Playfair_Display'] text-5xl md:text-8xl max-w-5xl mx-auto leading-[0.85] tracking-[-0.03em]">{t.cta.title}</h2>
          <p className="font-['Inter'] text-[13px] text-[#8C8880] mt-8 max-w-md mx-auto leading-relaxed">{t.cta.text}</p>
          <a href={`mailto:${siteData.email}`} className="inline-block border border-[#F5F3EF] px-10 py-4 uppercase tracking-[0.2em] text-[11px] font-['Inter'] mt-12 hover:bg-[#F5F3EF] hover:text-black transition-colors">{t.cta.btn} — {siteData.email}</a>
          <p className="font-['Inter'] text-[10px] uppercase tracking-[0.3em] text-[#8C8880] mt-16">{t.cta.note}</p>
        </FadeUp>
      </section>

      <footer className="bg-[#0E0E0E] border-t border-white/10 py-16 px-6 md:px-10 overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-10 font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#8C8880]">
          <div className="col-span-12 md:col-span-3 flex flex-col gap-3">
            <a href={`mailto:${siteData.email}`} className="hover:text-[#F5F3EF] transition normal-case tracking-normal">{siteData.email}</a>
            <a href="https://instagram.com/jesusdelagarsa" target="_blank" rel="noopener" className="hover:text-[#F5F3EF] transition">Instagram @jesusdelagarsa</a>
            <a href="https://facebook.com/jesusdelagarsa" target="_blank" rel="noopener" className="hover:text-[#F5F3EF] transition">Facebook</a>
          </div>
          <div className="col-span-12 md:col-span-3 flex flex-col gap-2">
            {navLinks.map(l => <a key={l.label} href={l.href} className="hover:text-[#F5F3EF] transition">{l.label}</a>)}
          </div>
          <div className="col-span-12 md:col-span-3">
            <p>© {new Date().getFullYear()} Jesús de la Garsa.</p>
            <p className="mt-2 normal-case tracking-normal text-[10px]">{t.hero.line}</p>
          </div>
          <div className="col-span-12 md:col-span-3">
            <p>{t.footer.pr}</p>
          </div>
        </div>
      </footer>

      {modal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-10">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease]" onClick={() => setModal(null)} />
          <div className={`relative w-full md:max-w-6xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto ${modal === 'vestuario' ? 'bg-[#0E0E0E] text-[#F5F3EF]' : 'bg-[#F5F3EF] text-[#0E0E0E]'} animate-[slideUp_0.5s_cubic-bezier(0.25,0.1,0.25,1)]`}>
            <button onClick={() => setModal(null)} className={`absolute top-5 right-6 z-10 w-10 h-10 flex items-center justify-center border ${modal === 'vestuario' ? 'border-white/20 text-[#F5F3EF]' : 'border-black/20 text-black'} hover:bg-black hover:text-white transition-colors`} aria-label="Close"><span className="text-xl leading-none">×</span></button>
            {modal === 'magnum' && (
              <div className="p-8 md:p-12">
                <span className="font-['Archivo_Black'] text-[10px] uppercase tracking-[0.3em] text-[#8C8880]">Magnum · Cannes 2026</span>
                <h3 className="font-['Playfair_Display'] text-4xl md:text-6xl mt-3 leading-[0.9]">Magnum</h3>
                <p className="font-['Inter'] text-[13px] leading-relaxed text-[#8C8880] mt-4 max-w-xl">{t.colecciones.magnumConcept}</p>
                <div className="mt-8 grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-8 font-['Inter'] text-[11px] uppercase tracking-[0.18em] leading-7 text-[#8C8880] border-l border-black/10 pl-6">
                    {t.cannes.ficha.map((f) => <p key={f}>{f}</p>)}
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["cannes-01","cannes-02","cannes-03","cannes-04","cannes-05","cannes-06"].map((id) => (
                    <ImageSlot key={id} id={id} ratio="3/4" className="h-[42vh] md:h-[48vh] !aspect-auto" alt={`Magnum look ${id}`} />
                  ))}
                </div>
              </div>
            )}
            {modal === 'supernova' && (
              <div className="p-8 md:p-12">
                <span className="font-['Archivo_Black'] text-[10px] uppercase tracking-[0.3em] text-[#8C8880]">Supernova · Intermoda 85</span>
                <h3 className="font-['Playfair_Display'] text-4xl md:text-6xl mt-3 leading-[0.9]">Supernova</h3>
                <p className="font-['Inter'] text-[13px] leading-relaxed text-[#8C8880] mt-4 max-w-xl">{t.colecciones.supernovaConcept}</p>
                <div className="mt-8 grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-8 font-['Inter'] text-[11px] uppercase tracking-[0.18em] leading-7 text-[#8C8880] border-l border-black/10 pl-6">
                    {t.intermoda.ficha.map((f) => <p key={f}>{f}</p>)}
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["intermoda-01","intermoda-02","intermoda-03","intermoda-04","intermoda-05","intermoda-06"].map((id) => (
                    <ImageSlot key={id} id={id} ratio="4/5" className="h-[42vh] md:h-[48vh] !aspect-auto" alt={`Supernova look ${id}`} />
                  ))}
                </div>
              </div>
            )}
            {modal === 'vestuario' && (
              <div className="p-8 md:p-12">
                <span className="font-['Archivo_Black'] text-[10px] uppercase tracking-[0.3em] text-[#8C8880]">{t.vestuario.label}</span>
                <h3 className="font-['Playfair_Display'] text-4xl md:text-6xl mt-3 leading-[0.9]">{t.vestuario.title}</h3>
                <p className="font-['Inter'] text-[13px] leading-relaxed text-[#8C8880] mt-4 max-w-xl">{t.vestuario.text}</p>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                  {celebs.map((c) => (
                    <div key={c.id}>
                      <ImageSlot id={c.id} ratio={c.ratio as any} className="h-[38vh] !aspect-auto" alt={c.name} />
                      <h4 className="font-['Playfair_Display'] text-xl mt-3 leading-none">{c.name}</h4>
                      <p className="font-['Inter'] text-[10px] uppercase tracking-[0.18em] text-[#8C8880] mt-1">{c.meta}</p>
                      <p className="font-['Inter'] text-[11px] leading-relaxed text-[#8C8880] mt-2">{c.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <p className="font-['Playfair_Display'] italic text-2xl max-w-md leading-tight">{t.cta.wardrobeQuestion}</p>
                  <button onClick={() => { setModal(null); setTimeout(()=>scrollToId('contacto'),200); }} className="border border-[#F5F3EF] px-8 py-3 uppercase tracking-[0.2em] text-[11px] font-['Inter'] hover:bg-[#F5F3EF] hover:text-black transition-colors">{t.cta.btn}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
