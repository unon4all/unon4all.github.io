import { AmbientBackground } from "@/components/journey/AmbientBackground";
import { JourneyRail } from "@/components/journey/JourneyRail";
import { Boot } from "@/components/scenes/Boot";
import { EraEvolution } from "@/components/scenes/EraEvolution";
import { PandaLetterScene } from "@/components/scenes/PandaLetterScene";
import { ScanifyScene } from "@/components/scenes/ScanifyScene";
import { TabletCanvas } from "@/components/scenes/TabletCanvas";
import { Foldable } from "@/components/scenes/Foldable";
import { Outro } from "@/components/scenes/Outro";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <JourneyRail />
      <main>
        <Boot />
        <EraEvolution />
        <PandaLetterScene />
        <ScanifyScene />
        <TabletCanvas />
        <Foldable />
        <Outro />
      </main>
    </>
  );
}
