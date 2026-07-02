export default function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  const color = dark ? "text-white" : "text-ink";
  return (
    <span className={`inline-flex flex-col items-center leading-none ${color} ${className}`}>
      <span className="font-serif text-2xl tracking-[0.2em]">KAIVO</span>
      <span className="text-[0.55rem] tracking-[0.35em] mt-1">REAL ESTATE</span>
    </span>
  );
}
