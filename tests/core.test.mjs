import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {matches,makeQueue,recordResult,validRecords} from '../core.mjs';
const db=JSON.parse(readFileSync(new URL('../data/vocabulary.json',import.meta.url)));
assert.equal(new Set(db.words.map(w=>w.id)).size,db.words.length);
for(const w of db.words){assert.ok(w.latin&&w.kind&&w.german.length&&w.german.every(g=>typeof g==='string'&&g.trim()));assert.ok(db.lessons.some(l=>l.id===w.lesson));for(const g of w.german)assert.ok(matches(g,w))}
const horse=db.words.find(w=>w.latin==='equus');assert.ok(matches('PFERD!',horse));assert.ok(!matches('Pfer',horse));assert.ok(!matches('Pferd; Baum',horse));assert.ok(!matches('',horse));
const records={};recordResult(records,horse.id,false);assert.equal(records[horse.id].streak,0);recordResult(records,horse.id,true);assert.equal(records[horse.id].streak,1);assert.ok(validRecords(records));assert.ok(!validRecords({w001:{right:-1,wrong:0,streak:0,last:0}}));
const queue=makeQueue(db.words,records,10,()=>0.5);assert.equal(queue.length,10);assert.equal(new Set(queue.map(w=>w.id)).size,10);assert.ok(!queue.some(w=>w.id===horse.id));
console.log(`${db.words.length} vocabulary entries and training logic verified.`);
