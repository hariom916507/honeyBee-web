import Hero from './sections/Hero'
import StepOne from './sections/StepOne'
import FlowerGallery from './sections/FlowerGallery'
import StepTwo from './sections/StepTwo'
import StepThree from './sections/StepThree'
import Final from './sections/Final'

export default function Home() {
  return (
    <main>
      <Hero />
      <StepOne />
      <FlowerGallery />
      <StepTwo />
      <StepThree />
      <Final />
    </main>
  )
}
