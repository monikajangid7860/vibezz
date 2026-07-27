import BagelCanvas from "../components/BagelPhysics";
import FoodOrbit from "../components/FoodOrbit/FoodOrbit";
import InteractiveAccordion from "../components/InteractiveAccordion/InteractiveAccordion";
import Asection from "../components/BagelPhysics/Asection";
import HeroHeading from "../components/HeroHeading/HeroHeading";
import StickyTestimonials from "../components/StickyTestimonials/StickyTestimonials";
import Marquee from "../components/BagelPhysics/Marquee";
import Menu  from "../components/BagelPhysics/Menu"
import Header from "../components/header/Header";
const sections = [
  ["01", "Boiled, then baked.", "The best bagels take their time. Ours start before sunrise, with a long ferment and a proper boil."],
  ["02", "A little ritual.", "Sesame on your sleeve, coffee in hand, a slow corner of the day that belongs only to you."],
  ["03", "Good things gather.", "Every bagel is made nearby, carried home warm, and shared around a table worth lingering at."],
];

export default function Home() {
  return (
    <><Header/>
    <main className="relative pt-[3rem] min-h-[200vh] overflow-x-clip bg-[#e9dfcf] text-[#302217]">
      <BagelCanvas />
      <FoodOrbit/>
      <InteractiveAccordion/>
      <Marquee/>
      <Menu/>
      <section className="relative z-10 flex min-h-[70vh]  items-center justify-center px-6 text-center">
        <div className="max-w-4xl rounded-[2rem] bg-[#e9dfcf]/72 px-7 py-5 backdrop-blur-[2px] sm:px-14 sm:py-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#886a50]">The neighborhood bakery</p>
          <HeroHeading />
          <p className="mx-auto mt-8 max-w-sm text-sm leading-relaxed text-[#745a44] sm:text-base">Scroll slowly. The kitchen is already at work.</p>
        </div>
      </section>
      {/* <div className="relative z-10 mx-auto max-w-6xl px-6 pb-[65vh]">
        {sections.map(([number, title, copy], index) => (
          <section key={number} className={`flex min-h-[72vh] items-center ${index % 2 ? "justify-end" : "justify-start"}`}>
            <article className="max-w-sm rounded-[1.5rem] bg-[#f4ede1]/82 p-8 shadow-[0_18px_55px_rgba(69,47,27,0.08)] backdrop-blur-sm sm:p-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[#a67a4e]">{number}</span>
              <h2 className="mt-4 font-display text-5xl leading-[0.9] tracking-[-0.05em]">{title}</h2>
              <p className="mt-5 leading-relaxed text-[#705741]">{copy}</p>
              </article>
              </section>
              ))}
              </div> */}
      <Asection/>
      
      <StickyTestimonials/>
      <footer className="relative z-10 mx-auto flex min-h-[100vh] lg:min-h-[78vh] max-w-[1600px] flex-col justify-end overflow-hidden rounded-t-[3rem] bg-[#322318]/72 px-7 pb-10 pt-24 text-[#221604] backdrop-blur-[1px] sm:px-14 sm:pb-14">
        {/* <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#472905]">Fresh from the oven</p> */}
        <div className="mt-5 flex flex-wrap items-end justify-between gap-8 border-t border-white/20 pt-6">
          <h2 className="font-display text-[clamp(5rem,10vw,9rem)] leading-[0.75] tracking-[-0.07em]">Come hungry.</h2>
          {/* <p className="max-w-48 text-sm leading-relaxed text-[#442b03]">Open every day, 7am until sold out.</p> */}
        </div>
      </footer>
              
    </main>
    </>
  );
}
