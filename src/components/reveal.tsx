'use client';
import { motion, useReducedMotion } from 'motion/react';
export function Reveal({children}:{children:React.ReactNode}){const reduced=useReducedMotion();return <motion.div initial={reduced?false:{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>{children}</motion.div>}
