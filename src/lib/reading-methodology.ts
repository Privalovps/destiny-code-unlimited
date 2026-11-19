/** Public reference metadata only; no premium interpretation text or authorization logic. */
export const ACTIVE_METHODOLOGY={
 id:'dc-nine-digit-sum-v1',
 name:'Destiny Code nine-position digit-sum convention',
 numbering:'Strength VIII / Justice XI / Fool XXII',
 status:'Independent editorial adaptation; not the complete Natalia Ladini system',
} as const;
export const INTERPRETATION_VERSION='4.0';
export const researchSources={
 'waite':{title:'A. E. Waite, The Pictorial Key to the Tarot',kind:'Primary tarot text',locator:'London: William Rider & Son, 1911; Part II, §2, individual trump chapters',url:'https://sacred-texts.com/book/the-pictorial-key-to-the-tarot',access:'Individual Major Arcana chapters inspected in the accessible transcription; not a birth-date matrix method.'},
 'ladini-2025':{title:'Nataliia Ladini, Matritsa sudby: Pervoistochnik',kind:'Primary author excerpt',locator:'Moscow: Eksmo/Bombora, 2025. 288 pp. ISBN 978-5-04-209095-0. Accessible excerpt: 15 PDF pages, especially printed pp. 3–4.',url:'https://www.respublica.ru/uploads/pdfs/625320.pdf',access:'Bibliography, contents and opening material inspected. Calculation chapter (printed p. 229 onward) and individual energy chapters are outside this excerpt.'},
 'ladini-publisher':{title:'Bombora publisher record',kind:'Primary publication metadata',locator:'Matritsa sudby: Pervoistochnik, ISBN 978-5-04-209095-0',url:'https://bombora.ru/book/175564/',access:'Publisher listing inspected; not evidence for unexposed formulas.'},
 'ladini-english':{title:'Natalia Ladini, Book DESTINY MATRIX (English PDF)',kind:'Author-site sales description',locator:'Product Book-24-1; edition date and pagination not supplied on the inspected page',url:'https://matricaladini.ru/product/destiny-matrix/',access:'Description only. Paid book not acquired or read.'},
 'ladini-2012-record':{title:'Nataliia Ladini, Diagnostika prednaznacheniia i korrektsiia sudby',kind:'Bibliographic catalogue',locator:'Russkii impuls, 2012. ISBN 9785902525660. Google Books lists 125 pages.',url:'https://books.google.com/books?id=TQBtkQEACAAJ',access:'Catalogue metadata only; no chapter text inspected. A secondary site reports 128 pages: pagination unresolved.'},
 'matrixdestiny':{title:'Matrix of Destiny methodology',kind:'Secondary commercial implementation',locator:'Methodology page, accessed November 17, 2026',url:'https://matrixdestiny.io/en/methodology',access:'Documents base anchors, digit-sum reduction and extra inner points; not independent verification of all Ladini rules.'},
 'destiny22':{title:'Destiny22 methodology',kind:'Secondary commercial implementation',locator:'Methodology page, accessed November 17, 2026',url:'https://destiny22.com/methodology/',access:'Documents a wider chart and claimed calculator comparison. Its claimed exhaustive validation was not independently reproduced.'},
} as const;
export type SourceId=keyof typeof researchSources;
export const waiteSlugs=['i-the-magician','ii-the-high-priestess','iii-the-empress','iv-the-emperor','v-the-hierophant','vi-the-lovers','vii-the-chariot','viii-strength-or-fortitude','ix-the-hermit','x-wheel-of-fortune','xi-justice','xii-the-hanged-man','xiii-death','xiv-temperance','xv-the-devil','xvi-the-tower','xvii-the-star','xviii-the-moon','xix-the-sun','xx-the-last-judgement','xxi-the-world','zero-the-fool'] as const;
export function symbolSourceUrl(number:number){if(!Number.isInteger(number)||number<1||number>22)throw new RangeError('Expected Arcana 1–22.');return `${researchSources.waite.url}/${waiteSlugs[number-1]}`;}
