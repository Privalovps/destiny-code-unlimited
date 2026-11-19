import type { Metadata } from 'next';
import { Header, Footer } from '@/components/shared';
import './globals.css';
import { themeBootstrap } from '@/lib/theme';
import { publicSiteOrigin } from '@/lib/server/site-origin';
export const metadata:Metadata={metadataBase:publicSiteOrigin(),title:{default:'DESTINY CODE — A new perspective, written in numbers',template:'%s | DESTINY CODE'},description:'Explore your birth date through a transparent 22-Arcana Destiny Matrix. A personal space for symbolism, curiosity, and self-reflection.',openGraph:{title:'DESTINY CODE',description:'Your numbers. A new perspective.',type:'website',locale:'en_US',images:[{url:'/opengraph-image',width:1200,height:630}]},twitter:{card:'summary_large_image'},robots:{index:true,follow:true}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeBootstrap}}/></head><body><a href="#main" className="skip">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html>}
