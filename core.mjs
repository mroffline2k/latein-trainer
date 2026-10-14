export function normalize(value){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ß/g,'ss').replace(/[?!.,;:()]/g,' ').trim().replace(/^(der|die|das|ein|eine)\s+/,'').replace(/\s+/g,' ')}
export function matches(answer,word){const parts=String(answer).split(/[;,/]/).map(normalize).filter(Boolean);return parts.length>0&&parts.every(part=>word.german.some(g=>normalize(g)===part))}
export function makeQueue(words,records,limit=10,random=Math.random){return words.map(w=>({w,priority:(records[w.id]?.streak||0)+random()*2})).sort((a,b)=>a.priority-b.priority).slice(0,limit).map(x=>x.w)}
export function recordResult(records,id,correct){const old=records[id]||{right:0,wrong:0,streak:0};records[id]={right:old.right+(correct?1:0),wrong:old.wrong+(correct?0:1),streak:correct?old.streak+1:0,last:Date.now()}}
export function validRecords(value){return value&&typeof value==='object'&&!Array.isArray(value)&&Object.entries(value).every(([k,v])=>/^w[\w-]+$/.test(k)&&v&&['right','wrong','streak'].every(f=>Number.isInteger(v[f])&&v[f]>=0)&&Number.isFinite(v.last))}

export function makeChoices(word,words,random=Math.random){
 const shuffle=items=>{for(let i=items.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}return items};
 const seen=new Set(word.german.map(normalize)),wrong=[];
 const candidates=shuffle(words.filter(w=>w.id!==word.id&&w.kind===word.kind)).concat(shuffle(words.filter(w=>w.id!==word.id&&w.kind!==word.kind)));
 for(const candidate of candidates){for(const meaning of candidate.german){const key=normalize(meaning);if(!seen.has(key)&&!matches(meaning,word)){seen.add(key);wrong.push(meaning);break}}if(wrong.length===2)break}
 if(wrong.length<2)return [];
 return shuffle([{label:word.german[0],correct:true},...wrong.map(label=>({label,correct:false}))]);
}
