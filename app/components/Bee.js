'use client'

import dynamic from 'next/dynamic'
import styles from './Bee.module.css'

const TransparentVideo = dynamic(() => import('./TransparentVideo'), { ssr: false })

export default function Bee() {
  return (
    <div id="bee" className={styles.bee} aria-hidden="true" role="presentation">
      <div className={styles.beeFloat}>
        <TransparentVideo
          className={styles.beeVideo}
          src="/animated-video/trBee.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  )
}
