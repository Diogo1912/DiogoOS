import { Window } from "@/components/os/Window";
import { BrowserChrome } from "@/components/os/BrowserChrome";
import { HomeProfile } from "@/components/pages/HomeProfile";

export default function HomePage() {
  return (
    <Window
      id="/"
      title="Browser"
      bodyClassName="linkedin2007-window-body"
      toolbar={
        <BrowserChrome
          url="https://diogonet.com/in/diogobaptista"
          tabTitle="Diogo Baptista | diogonet"
        />
      }
    >
      <HomeProfile />
    </Window>
  );
}
