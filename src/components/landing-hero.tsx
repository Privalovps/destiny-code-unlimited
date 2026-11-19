import type { ChartDTO } from '@/lib/methodology/public';
import { ExpandedMatrix } from './expanded-matrix';
import type { Matrix } from '@/lib/numerology';
import { BirthForm } from './birth-form';
import { Chart } from './chart';
import Image from 'next/image';
import { CelestialRing } from './hero-artwork';
import styles from './landing-hero.module.css';

export function LandingHero({matrix,expanded,sampleDate='1993-04-17'}:{matrix?:Matrix;expanded?:ChartDTO;sampleDate?:string}) {
  return <section className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.artwork} aria-hidden="true"><CelestialRing className={styles.wheel}/><Image src="/artwork/hero-sculpture.png" alt="" width={596} height={790} className={styles.ornament} sizes="(max-width: 540px) 138px, (max-width: 768px) 235px, (max-width: 1100px) 300px, (min-width: 1600px) 385px, 365px" priority unoptimized/></div>
    <div className={styles.inner}>
      <div className={styles.folio}><span>DESTINY CODE</span><span>AN ATLAS FOR REFLECTION / № 22</span></div>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>THE ART OF SELF-DISCOVERY</p>
        <h1 className={styles.headline} id="hero-title"><span className={styles.firstLine}>The code</span>{' '}<span className={styles.secondLine}>within you.</span></h1>
        <p className={styles.description}>Explore your personal Destiny Matrix through 22 symbolic archetypes.</p>
        <div className={styles.form}><BirthForm/></div>
        <p className={styles.disclaimer}>A symbolic reading. An open question.<br/>Your story remains your own.</p>
      </div>
      <div className={styles.artCaption}><span>THE WINGED FIGURE</span><span>An ornamental atlas<br/>of 22 symbolic archetypes.</span></div>
      <div className={styles.bottomLine}>
        <a href="#how-it-works" className={styles.explore}>A closer look <span aria-hidden="true">↓</span></a>
        <details className={styles.matrixExample}><summary>Explore the example matrix <span aria-hidden="true">↗</span></summary><div className={styles.matrixBody}>{expanded?<ExpandedMatrix chart={expanded} example/>:matrix?<Chart matrix={matrix} preview/>:null}<p>Illustrative example · {sampleDate}.</p></div></details>
      </div>
    </div>
  </section>;
}
