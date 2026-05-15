import { Window } from "@/components/os/Window";
import { ContactIChat } from "@/components/pages/ContactIChat";

export const metadata = {
  title: "Contact — Diogo Baptista",
};

export default function ContactPage() {
  return (
    <Window id="/contact" title="Diogo Baptista — iChat" bodyClassName="ichat-bg">
      <ContactIChat />
    </Window>
  );
}
