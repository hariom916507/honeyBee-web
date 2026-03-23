import './globals.css'
import Bee from './components/Bee'
import Header from './components/Header'
import GSAPInit from './components/GSAPInit'
import BeeScrollAnimation from './components/BeeScrollAnimation'
import TextZoom from './components/TextZoom'

export const metadata = {
  title: 'nectaBee — The Story of Honey',
  description: 'A premium scroll experience exploring the art of honey production.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Side-effect components — render nothing visible */}
        <GSAPInit />
        <BeeScrollAnimation />
        <TextZoom />

        {/* Fixed navigation header */}
        <Header />

        {/* Fixed bee character — positioned by BeeScrollAnimation */}
        <Bee />

        {/* Page content */}
        {children}
      </body>
    </html>
  )
}
