import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/31636074531"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,40%)] text-[hsl(0,0%,100%)] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
);

export default WhatsAppButton;