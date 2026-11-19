import { createHash } from 'node:crypto';
export function composeReport(matrix, data) {
  const positions=new Map(data.positions.map(x=>[x.id,x]));
  const arcana=new Map(data.arcana.map(x=>[x.number,x]));
  const a=id=>arcana.get(matrix.values[id]);
  const label=id=>`${positions.get(id).displayName} [${id}] = ${matrix.values[id]} — ${a(id).name}`;
  const editorial={classification:'editorial_synthesis',sourceRefs:[],editorialNote:'Original role-based report composition.'};
  const block=(text,ids=[],ruleIds=[],kind='paragraph')=>({kind,text,nodeIds:ids,formulaIds:ids,ruleIds,provenance:{...editorial,sourceRefs:[...new Map(ids.flatMap(id=>[...positions.get(id).provenance.sourceRefs,...a(id).sourceRefs]).map(r=>[JSON.stringify(r),r])).values()]}});
  const seen=new Set();
  function reading(id,example=false,domainOverride=null) {
    const p=positions.get(id), ar=a(id), domainId=domainOverride || p.domain, key=ar.number+':'+domainId;
    const domain=seen.has(key)?`The ${ar.coreSymbolicMeaning} theme appears again in a different role.`:ar.domainReadings[domainId];
    seen.add(key);
    return block(`${label(id)}. ${p.role} ${domain}${example?' For example: '+(domainId==='relationship'?'When a shared plan changes, state what you want directly and ask the other person what they want, while leaving room for either person to say no.':ar.everydayExample):''} `,[id],[], 'position');
  }
  const sections=[];
  for (const spec of data.report_sections) {
    const blocks=[];
    if(spec.id==='orientation') {
      blocks.push(block('An archetype is a symbolic pattern associated with one of 22 numbered themes. A position gives that theme a role; a channel joins specified positions. Constructive and shadow readings are alternative possibilities to consider, not states diagnosed from your birthday. This reading uses the C-family-center convention and original English editorial interpretations.'));
      blocks.push(block('Your date produces a diagram with 30 named nodes, a separate family-resource aggregate, and seven line/purpose aggregates. Repeated values arise partly because the numbers are calculated from one another. They are not independent evidence about you.'));
    } else if(spec.id==='ancestry') {
      blocks.push(reading('family_center'));
      for(const corner of ['nw','ne','se','sw']) {
        const ids=[corner,corner+'_inner',corner+'_mid'];
        const themes=ids.map(id=>`${matrix.values[id]} (${a(id).coreSymbolicMeaning})`).join(' → ');
        blocks.push(block(`${positions.get(corner).displayName}: ${themes}, in calculation order. ${a(corner).familyAndAncestralThemes} The second and third values qualify this symbolic branch; they do not identify traits or events in your relatives. C calculates its inner value with family_center, not core.`,ids,['COM-CHANNEL'],'position'));
      }
      blocks.push(block('A useful family reflection concerns a choice you can observe now: which expectation do you want to retain, revise, or decline? The chart does not require contact with a relative or establish an obligation to repair another person\'s history.'));
    } else if(spec.id==='learning') {
      const ids=['bottom','bottom_inner','bottom_mid'];const key=ids.map(id=>matrix.values[id]);
      const pattern=data.karmic_patterns.find(x=>x.match.orderedValues.every((v,i)=>v===key[i]));
      blocks.push(block(`The ordered learning key is ${key.join('–')}: bottom, inner, then middle. The physical bottom-to-center order is ${['bottom','bottom_mid','bottom_inner'].map(id=>matrix.values[id]).join('–')}; it is not the catalog lookup order.`,ids,['COM-TAIL-C']));
      if(pattern)blocks.push(block(`${pattern.title}. ${pattern.symbolicReading} ${pattern.practice} This is an original present-life reflection on a source-specific key, not a statement that you performed a particular act in a past life.`,ids,['COM-TAIL-C'],'pattern'));
      else blocks.push(block(`No exact named C-pattern is matched. The general bottom theme is ${a('bottom').coreSymbolicMeaning}. ${a('bottom').personalDevelopment}` ,['bottom'],['COM-TAIL-C'],'pattern'));
      blocks.push(reading('bottom'));blocks.push(block(`The supporting themes are ${a('bottom_inner').coreSymbolicMeaning} and ${a('bottom_mid').coreSymbolicMeaning}. Interpret these in the learning channel; do not borrow a partner or work profile simply because the same numbers occur elsewhere.`,ids,['COM-CHANNEL']));
    } else if(spec.id==='integration') {
      const practiceValues=new Set();
      for(const id of ['core','money_center','love_center']) {
        if(practiceValues.has(matrix.values[id]))continue;practiceValues.add(matrix.values[id]);
        blocks.push(block(`${label(id)}: ${a(id).reflectivePractice} After the experiment, record what you actually did and what you learned. Keep, revise, or discard the interpretation on that basis.`,[id],[],'practice'));
      }
    } else if(spec.id==='reference') {
      let text='| Formula | Operands | Reduction | Result |\n|---|---|---|---:|\n';
      for(const t of matrix.trace)text+=`| ${t.formulaId} | ${t.operands.join(' + ')} | ${t.reductionSteps.join(' → ')} | ${t.result} |\n`;
      blocks.push(block(text,Object.keys(matrix.values),[],'calculation_table'));
      blocks.push(block('The source calculation profile is C-family-center-v1. A/B use a different center for ancestral inner points. Generic program headings are not activated because a universal detector remains unresolved. Source citations identify conceptual origin, not scientific validity. Detailed evidence, page coverage and editorial provenance accompany the methodology package.'));
    } else if(spec.id==='purpose') {
      blocks.push(block(`Earth=${matrix.values.earth}; Sky=${matrix.values.sky}; personal purpose=${matrix.values.purpose_personal}. Paternal=${matrix.values.paternal}; maternal=${matrix.values.maternal}; social purpose=${matrix.values.purpose_social}. Spiritual purpose=${matrix.values.purpose_spiritual} combines the two purposes. Each named intermediate value is reduced before the next formula.`,['earth','sky','purpose_personal','paternal','maternal','purpose_social','purpose_spiritual']));
      for(const id of ['purpose_personal','purpose_social','purpose_spiritual','heart_earth','heart_sky'])blocks.push(reading(id));
      blocks.push(block('The source emphasizes personal development around 20–40 and contribution around 40–60 while treating spiritual purpose as lifelong. These are symbolic emphases, not deadlines. A different life sequence does not indicate failure.'));
    } else {
      const introductions={
        core:'The center describes an organizing preference; the birth-day point describes outward expression. The two roles can show different ways to approach the same situation.',
        talents:'The top arm separates inspiration, expression, and skills. These are practices to explore in combination, rather than a list of abilities your birthday certifies.',
        relationships:'This channel connects an entry theme, qualities valued in partnership, and a shared point where relationships and resources meet.',
        resources:'The right arm describes material habits; the money midpoint adds a work theme. Keeping these roles separate is more useful than treating every number here as a career prediction.',
        parenting:'The left arm offers a way to consider patterns of care, independence, and family communication. Apply a theme only where it fits your experience.',
        purpose:'Purpose here means a symbolic direction for development. The source emphasizes personal themes at 20–40 and social contribution at 40–60, while spiritual integration remains relevant throughout life. These are lenses for reflection, not deadlines.'
      };
      if(introductions[spec.id])blocks.push(block(introductions[spec.id]));
      for(const id of spec.positionIds) {
        if(id==='bridge' && spec.id==='resources') {
          blocks.push(block(`The shared bridge is again ${matrix.values.bridge} (${a('bridge').name}). Use the same relationship–resource interpretation described in the relationships chapter, now when agreeing on work time, spending, or shared responsibilities.`,['bridge'],['COM-BALANCE']));
        } else if(id==='money_center' && spec.id==='talents') {
          blocks.push(block(`Work experiment: combine ${a('month_inner').strengthsAndTalents.replace(/\.$/,'').toLowerCase()} with the ${a('money_center').coreSymbolicMeaning} theme at money_center=${matrix.values.money_center}. Test it in a small useful deliverable before deciding whether it suits you.`,['month_inner','money_center'],['COM-TALENT-WORK']));
        } else blocks.push(reading(id,id===spec.positionIds[0],spec.id==='relationships' && id==='bottom_inner'?'relationship':null));
      }
      if(spec.id==='relationships')blocks.push(block('A practical bridge exercise is to compare the facts of a shared commitment with the assumptions each person brought to it: what time or money was actually agreed, and what did each person only expect?', ['bridge'],['COM-BALANCE']));
      if(spec.id==='core') {
        const primary=['day','month','year','bottom','core','nw','ne','se','sw'];
        const groups=new Map();for(const id of primary){const n=matrix.values[id];groups.set(n,[...(groups.get(n)||[]),id]);}
        let repeatCount=0;for(const [n,ids] of groups)if(ids.length>1 && repeatCount++<2)blocks.push(block(`${n} (${arcana.get(n).coreSymbolicMeaning}) occurs at distinct primary nodes ${ids.join(', ')}. The role changes with each position. This is structural recurrence, not a multiplier for a measured trait.`,ids,['COM-REPEAT']));
      }
      const eligible=new Set(spec.positionIds.map(id=>matrix.values[id]));
      const contrast=data.contrast_pairs.find(pair=>pair.values.every(n=>eligible.has(n)));
      if(contrast && spec.combinationRuleIds.includes('COM-CONTRAST'))blocks.push(block(`A symbolic tradeoff joins ${contrast.themes.join(' and ')}. ${contrast.guidance} This is an original composition example, not an established predictive pairing.`,spec.positionIds.filter(id=>contrast.values.includes(matrix.values[id])),['COM-CONTRAST']));
    }
    const shadowAnchors={core:'core',talents:'month',relationships:'love_center',resources:'money_center',parenting:'day',learning:'bottom'};
    const shadowId=shadowAnchors[spec.id];
    if(shadowId)blocks.push(block(`A shadow possibility to examine: ${a(shadowId).shadowManifestations[0]} This is a contrast to test against experience, not a conclusion about your current behavior.`,[shadowId]));
    sections.push({id:spec.id,title:spec.title,blocks});
  }
  const sourceDataHash=createHash('sha256').update(JSON.stringify(data)).digest('hex');
  return {dateOnly:matrix.date,methodologyVersion:matrix.methodologyVersion,calculationProfile:matrix.calculationProfile,contentVersion:'en-US-editorial-1.0.0-proposed',reportSchemaVersion:'1.0.0',sourceDataHash,locale:'en-US',values:matrix.values,sections};
}
export function renderMarkdown(report) {
  return '# Complete symbolic reading\n\nDate: '+report.dateOnly+'\n\nMethod: '+report.methodologyVersion+' / '+report.calculationProfile+'\n\nContent: '+report.contentVersion+'\n\n'+report.sections.map(s=>'## '+s.title+'\n\n'+s.blocks.map(b=>b.text).join('\n\n')).join('\n\n')+'\n';
}
export function freePreview(matrix,data) {
  return {dateOnly:matrix.date,methodologyVersion:matrix.methodologyVersion,calculationProfile:matrix.calculationProfile,contentVersion:'en-US-editorial-1.0.0-proposed',positions:['day','core'].map(id=>({id,number:matrix.values[id],coreSymbolicMeaning:data.arcana.find(a=>a.number===matrix.values[id]).coreSymbolicMeaning})),disclosure:'A symbolic and reflective framework, not a scientifically validated assessment or prediction.'};
}
