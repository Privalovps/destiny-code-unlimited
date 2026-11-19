'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="shell section narrow"><p className="eyebrow">SOMETHING WENT ASTRAY</p><h1 className="page-title">Let’s try that again.</h1><p>We couldn’t finish loading this page. Please try again.</p><button onClick={reset} className="button" style={{marginTop:24}}>Try again</button></section>}
