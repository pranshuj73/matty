import Image from "next/image";

export default function Pros() {
  const pClasses = "opacity-60 mt-2 text-sm sm:text-base text-justify";
  return (
    <section className="max-w-screen-lg grid md:grid-cols-2 items-center py-12">
      <div className="col-span-1">
        <h2 className="text-4xl md:text-5xl font-semibold">Focus on what matters most.</h2>
        <p className={pClasses}>We've all been there: juggling a dozen calendars, painstakingly crafting event details, and playing email tag to find a meeting time.</p>
        <p className={pClasses}>Calendar apps should empower you, not pile on the busywork. That's where Matty comes in.</p>
      </div>
      <div className="col-span-1 hidden md:block overflow-hidden aspect-square p-6 md:p-20 fade-b-edge">
        <Image className="w-full h-auto" src="/landing/pros.svg" width={1000} height={1000} alt="Hassle Free Scheduling" />
      </div>

      <div className="col-span-1 p-10 md:hidden">
        <Image className="w-full h-auto" src="/landing/pros.svg" width={1000} height={1000} alt="Hassle Free Scheduling" />
      </div>

      <div className="col-span-1 hidden md:flex items-end overflow-hidden aspect-square p-6 md:p-20 fade-t-edge">
        <Image className="w-full h-auto" src="/landing/pros.svg" width={1000} height={1000} alt="Hassle Free Scheduling" />
      </div>
      <div className="col-span-1">
        <h2 className="text-4xl md:text-5xl font-semibold">Human-like Interactions.</h2>
        <p className={pClasses}>Forget clunky menus and confusing interfaces.  Just tell Matty what you need, and he'll handle the rest.</p>
        <p className={pClasses}>Need to schedule a meeting with your team?  Just say "Find a time that works for everyone to discuss the marketing campaign next week."</p>
      </div>
    </section>
  )
}