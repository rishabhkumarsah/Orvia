import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/orvia-logo.png";
import heroForest from "@/assets/hero-forest.jpg";
import parallaxLeaves from "@/assets/parallax-leaves.jpg";
import earthImg from "@/assets/earth-parallax.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import { useParallax, useScrollY } from "@/hooks/use-parallax";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORVIA — Eco-Friendly Essentials" },
      { name: "description", content: "Sustainable, plant-based products crafted for a living earth." },
    ],
  }),
  component: Index,
});

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M20 4C20 4 18 14 12 18C8 20.5 4 20 4 20C4 20 3.5 16 6 12C10 6 20 4 20 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M4 20C8 16 12 12 18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Nav() {
  const y = useScrollY();
  const solid = y > 40;
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="ORVIA" className="h-7 md:h-8 w-auto" />
        </a>
        <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide text-foreground/80">
          <li><a className="hover:text-primary transition" href="#story">Story</a></li>
          <li><a className="hover:text-primary transition" href="#products">Products</a></li>
          <li><a className="hover:text-primary transition" href="#impact">Impact</a></li>
          <li><a className="hover:text-primary transition" href="#journal">Journal</a></li>
        </ul>
        <a
          href="#products"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/50 px-5 py-2 text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Shop
          <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const y = useScrollY();
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden grain">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 -z-20"
        style={{ transform: `translate3d(0, ${y * 0.4}px, 0) scale(1.15)` }}
      >
        <img
          src={heroForest}
          alt="Sunlit forest canopy"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Dark vignette */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      {/* Floating leaf */}
      <div
        className="absolute -z-10 right-[6%] top-[20%] text-primary/40 animate-float-slow"
        style={{ transform: `translateY(${y * -0.15}px)` }}
      >
        <LeafIcon className="w-32 h-32 md:w-48 md:h-48" />
      </div>

      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ transform: `translateY(${y * -0.2}px)`, opacity: Math.max(0, 1 - y / 600) }}
      >
        <div className="flex items-center gap-3 text-primary/80 text-xs tracking-[0.4em] uppercase mb-8 animate-fade-up">
          <span className="h-px w-10 bg-primary/60" />
          Rooted in nature
          <span className="h-px w-10 bg-primary/60" />
        </div>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-cream leading-[0.95] max-w-5xl animate-fade-up">
          A quieter way<br />
          <span className="italic text-gradient-gold">to live well.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-foreground/80 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          ORVIA crafts plant-based essentials from compostable materials and ethically sourced botanicals — designed to leave more than they take.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="#products"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-primary-foreground font-medium shadow-glow hover:scale-105 transition-transform"
          >
            Explore the collection
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#story"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-foreground/30 px-8 py-4 text-foreground hover:bg-foreground/10 transition"
          >
            Our story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground/50 text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function Story() {
  const { ref, offset } = useParallax(0.2);
  return (
    <section id="story" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-deep"
        >
          <img
            src={parallaxLeaves}
            alt="Dewdrops on leaves"
            loading="lazy"
            width={1920}
            height={1080}
            className="absolute inset-0 h-[120%] w-full object-cover"
            style={{ transform: `translateY(${offset}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        <div>
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">Our philosophy</p>
          <h2 className="text-5xl md:text-6xl text-cream leading-[1.05] mb-8">
            We borrow from the earth,<br />
            <span className="italic text-gradient-gold">and give it back.</span>
          </h2>
          <p className="text-foreground/75 text-lg leading-relaxed mb-6">
            Every ORVIA product begins in a field, a forest, or a farm — never a factory floor. We work with small growers, regenerative farms, and zero-waste workshops to bring you objects you can use without compromise.
          </p>
          <p className="text-foreground/60 leading-relaxed">
            From the bamboo we mill to the linen we weave, each material is chosen to compost, biodegrade, or live a very long, beautiful life.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { n: "100%", l: "Plant-based" },
              { n: "32k", l: "Trees planted" },
              { n: "0", l: "Plastic, ever" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl text-primary">{s.n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const items = [
    { img: product1, name: "Bamboo Vessel Set", price: "$48", tag: "New" },
    { img: product2, name: "Botanical Bar Soap", price: "$18", tag: "Bestseller" },
    { img: product3, name: "Linen Carry Tote", price: "$32", tag: "Limited" },
  ];
  return (
    <section id="products" className="relative py-32 md:py-48 px-6 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">The collection</p>
            <h2 className="text-5xl md:text-6xl text-cream">
              Crafted, not <span className="italic text-gradient-gold">manufactured.</span>
            </h2>
          </div>
          <a href="#" className="text-primary hover:underline underline-offset-8">View all products →</a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((p, i) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-primary/40 transition-all duration-500"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 text-xs uppercase tracking-widest bg-background/80 backdrop-blur px-3 py-1 rounded-full text-primary border border-primary/30">
                  {p.tag}
                </span>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl text-cream">{p.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">Compostable · Handmade</p>
                </div>
                <span className="text-primary text-lg">{p.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const y = useScrollY();
  return (
    <section id="impact" className="relative h-[110vh] min-h-[700px] overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: `translate3d(0,${(y - 1800) * 0.25}px,0) scale(1.1)` }}
      >
        <img
          src={earthImg}
          alt="Earth from space"
          loading="lazy"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">Our impact</p>
        <h2 className="font-display text-5xl md:text-7xl text-cream leading-[1.05]">
          One planet. <br />
          <span className="italic text-gradient-gold">One commitment.</span>
        </h2>
        <p className="mt-8 text-lg text-foreground/75 max-w-2xl">
          For every order placed, we plant a tree through verified reforestation partners — and offset 100% of our shipping carbon. Small acts. Compounding good.
        </p>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-3xl">
          {[
            { n: "32,481", l: "Trees planted" },
            { n: "184t", l: "CO₂ offset" },
            { n: "0kg", l: "Plastic shipped" },
            { n: "12", l: "Partner farms" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl md:text-4xl text-primary">{s.n}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section id="journal" className="py-32 md:py-48 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">Field Notes</p>
          <h2 className="text-5xl md:text-6xl text-cream">From the <span className="italic text-gradient-gold">journal</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { t: "The slow making of a bamboo cup", c: "Inside our partner workshop in Kerala." },
            { t: "Why compostable still matters in 2026", c: "A field guide to better material choices." },
            { t: "Meet the growers behind our linen", c: "A weekend with the Hemphill farm collective." },
          ].map((p, i) => (
            <a key={p.t} href="#" className="group block border-t border-border pt-6 hover:border-primary transition-colors">
              <span className="text-xs tracking-widest text-muted-foreground">0{i + 1} · Journal</span>
              <h3 className="font-display text-2xl text-cream mt-4 group-hover:text-primary transition-colors">{p.t}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{p.c}</p>
              <span className="inline-block mt-6 text-primary text-sm">Read →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const [email, setEmail] = useState("");
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-earth -z-10" />
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
      </div>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl text-cream leading-tight">
          Join the <span className="italic text-gradient-gold">slow movement.</span>
        </h2>
        <p className="text-foreground/75 mt-6 text-lg">
          Letters from the field — new launches, behind-the-scenes, and the occasional recipe. No noise, ever.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-background/40 border border-border rounded-full px-6 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary backdrop-blur"
          />
          <button className="rounded-full bg-primary text-primary-foreground px-8 py-3 font-medium hover:scale-105 transition-transform shadow-glow">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <img src={logo} alt="ORVIA" className="h-8 w-auto mb-4" />
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Eco-friendly essentials, made by hand from plants and a deep respect for the planet we share.
          </p>
        </div>
        <div>
          <h4 className="text-cream font-display text-lg mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">New arrivals</a></li>
            <li><a href="#" className="hover:text-primary">Bestsellers</a></li>
            <li><a href="#" className="hover:text-primary">Gift sets</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream font-display text-lg mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#story" className="hover:text-primary">Our story</a></li>
            <li><a href="#impact" className="hover:text-primary">Impact</a></li>
            <li><a href="#journal" className="hover:text-primary">Journal</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} ORVIA. Grown, not made.</span>
        <span>Crafted with care · Carbon neutral shipping</span>
      </div>
    </footer>
  );
}

function Index() {
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Story />
      <Products />
      <Impact />
      <Journal />
      <CTA />
      <Footer />
    </main>
  );
}
