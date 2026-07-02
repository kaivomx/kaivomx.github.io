import { company } from "@/lib/content";

export default function WhatsAppButton({ message }: { message?: string }) {
  const text = encodeURIComponent(message ?? "Hola, me gustaría más información sobre KAIVO Real Estate.");
  const href = `${company.whatsappUrl}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.61 1.902 6.478L4 29l7.72-1.865A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.6a9.55 9.55 0 0 1-4.87-1.334l-.35-.207-4.58 1.107 1.223-4.463-.228-.365A9.556 9.556 0 1 1 25.56 15c0 5.294-4.29 9.6-9.556 9.6Zm5.24-7.166c-.287-.144-1.698-.838-1.962-.934-.263-.096-.455-.144-.647.144-.192.287-.743.934-.911 1.126-.168.192-.336.216-.623.072-.287-.144-1.212-.447-2.31-1.427-.854-.762-1.43-1.703-1.598-1.99-.168-.287-.018-.442.126-.585.13-.13.287-.336.43-.504.144-.168.192-.287.287-.479.096-.192.048-.36-.024-.504-.072-.144-.647-1.56-.887-2.137-.234-.562-.472-.486-.647-.495l-.552-.01c-.192 0-.503.072-.767.36-.263.287-1.006.983-1.006 2.398 0 1.415 1.03 2.782 1.174 2.974.144.192 2.028 3.096 4.913 4.34.687.297 1.222.474 1.64.607.689.22 1.316.189 1.812.115.553-.083 1.698-.694 1.937-1.365.24-.671.24-1.246.168-1.365-.072-.12-.263-.192-.55-.336Z" />
      </svg>
    </a>
  );
}
