import Hero from './sections/Hero'
import OurHoney from './sections/OurHoney'
import ProducerExcellence from './sections/ProducerExcellence'
import EthicsStewardship from './sections/EthicsStewardship'
import FromHiveToHome from './sections/FromHiveToHome'
import GiftingBulk from './sections/GiftingBulk'
import FAQ from './sections/FAQ'
import GetInTouch from './sections/GetInTouch'

export default function Home() {
  return (
    <main>
      <Hero />
      <OurHoney />
      <ProducerExcellence />
      <EthicsStewardship />
      <FromHiveToHome />
      <GiftingBulk />
      <FAQ />
      <GetInTouch />
    </main>
  )
}
