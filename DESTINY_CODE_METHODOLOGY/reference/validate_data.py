from pathlib import Path
import json,csv,hashlib
import jsonschema
ROOT=Path(__file__).resolve().parents[1]
def read(name):return json.loads((ROOT/'data'/f'{name}.json').read_text())
results=[]
for file in sorted((ROOT/'data').glob('*.json')):json.loads(file.read_text())
results.append('All JSON files parse')
for file in sorted((ROOT/'schemas').glob('*.schema.json')):
 name=file.name.removesuffix('.schema.json');jsonschema.Draft202012Validator(json.loads(file.read_text())).validate(read(name));results.append(f'JSON schema: {name}')
source_max={s['id']:s['pages'] for s in read('sources')}
def walk(x):
 if isinstance(x,dict):
  if 'sourceId' in x and 'pdfPages' in x:
   assert x['sourceId'] in source_max
   assert all(1<=p<=source_max[x['sourceId']] for p in x['pdfPages'])
  for v in x.values():walk(v)
 elif isinstance(x,list):
  for v in x:walk(v)
for f in (ROOT/'data').glob('*.json'):walk(json.loads(f.read_text()))
results.append('All source IDs and page ranges resolve')
rules=read('calculation_rules')['rules'];ids={r['id'] for r in rules};assert len(ids)==38
known={'yearNumber','dayOfMonth','monthOfYear'}
for r in rules:
 assert all(i in known for i in r['inputs']),r['id'];known.add(r['id'])
assert {p['id'] for p in read('positions')}==ids
for p in read('positions'):assert p['formulaId'] in ids
for c in read('channels'):
 for key in ['physicalOrder','interpretationOrder']:assert set(c[key])<=ids
comb_ids={x['id'] for x in read('combination_rules')}
for s in read('report_sections'):
 assert set(s['positionIds'])<=ids
 assert set(s['combinationRuleIds'])<=comb_ids
results.append('Formula DAG, positions, channels and section-rule references resolve')
assert len(read('arcana'))==22
for a in read('arcana'):
 assert set(a['interactionRuleIds'])<=comb_ids
 for p in read('positions'):assert p['domain'] in a['domainReadings']
results.append('Every archetype covers every active domain')
coverage=list(csv.DictReader((ROOT/'research/PAGE_COVERAGE.csv').open()));assert len(coverage)==630
assert all(r['exhaustive_semantic_read']=='False' for r in coverage)
assert len({(r['source_id'],r['pdf_page']) for r in coverage})==630
results.append('630 unique page records; extraction not mislabeled exhaustive semantic review')
patterns=read('karmic_patterns');assert len({x['id'] for x in patterns})==26
assert all(x['match']['channelId']=='karmic_tail' for x in patterns)
results.append('26 stable exact-tail pattern IDs')
report=read('sample_report_model');assert report['calculationProfile']=='C-family-center-v1'
assert len(report['values'])==38
results.append('Sample model uses selected profile and38-value contract')
output={'status':'passed','checks':results,'limitations':['No full line-by-line reading claim','No target repository integration','No actual PDF rendering or entitlement tests']}
(ROOT/'data/data_validation_results.json').write_text(json.dumps(output,indent=2)+'\n')
print(json.dumps({'status':'passed','checks':len(results),'schemas':len(list((ROOT/'schemas').glob('*.schema.json'))),'coverageRows':len(coverage)}))
