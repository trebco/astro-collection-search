"use strict";(()=>{function C(n,t,e,s){function i(o){return o instanceof e?o:new e(function(r){r(o)})}return new(e||(e=Promise))(function(o,r){function c(a){try{u(s.next(a))}catch(l){r(l)}}function d(a){try{u(s.throw(a))}catch(l){r(l)}}function u(a){a.done?o(a.value):i(a.value).then(c,d)}u((s=s.apply(n,t||[])).next())})}var it="ENTRIES",q="KEYS",K="VALUES",p="",z=class{constructor(t,e){let s=t._tree,i=Array.from(s.keys());this.set=t,this._type=e,this._path=i.length>0?[{node:s,keys:i}]:[]}next(){let t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};let{node:t,keys:e}=S(this._path);if(S(e)===p)return{done:!1,value:this.result()};let s=t.get(S(e));return this._path.push({node:s,keys:Array.from(s.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;let t=S(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>S(t)).filter(t=>t!==p).join("")}value(){return S(this._path).node.get(p)}result(){switch(this._type){case K:return this.value();case q:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}},S=n=>n[n.length-1],ot=(n,t,e)=>{let s=new Map;if(t===void 0)return s;let i=t.length+1,o=i+e,r=new Uint8Array(o*i).fill(e+1);for(let c=0;c<i;++c)r[c]=c;for(let c=1;c<o;++c)r[c*i]=c;return G(n,t,e,s,r,1,i,""),s},G=(n,t,e,s,i,o,r,c)=>{let d=o*r;t:for(let u of n.keys())if(u===p){let a=i[d-1];a<=e&&s.set(c,[n.get(u),a])}else{let a=o;for(let l=0;l<u.length;++l,++a){let h=u[l],m=r*a,_=m-r,f=i[m],g=Math.max(0,a-e-1),y=Math.min(r-1,a+e);for(let w=g;w<y;++w){let j=h!==t[w],L=i[_+w]+ +j,O=i[_+w+1]+1,b=i[m+w]+1,x=i[m+w+1]=Math.min(L,O,b);x<f&&(f=x)}if(f>e)continue t}G(n.get(u),t,e,s,i,a,r,c+u)}},v=class n{constructor(t=new Map,e=""){this._size=void 0,this._tree=t,this._prefix=e}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");let[e,s]=V(this._tree,t.slice(this._prefix.length));if(e===void 0){let[i,o]=$(s);for(let r of i.keys())if(r!==p&&r.startsWith(o)){let c=new Map;return c.set(r.slice(o.length),i.get(r)),new n(c,t)}}return new n(e,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,rt(this._tree,t)}entries(){return new z(this,it)}forEach(t){for(let[e,s]of this)t(e,s,this)}fuzzyGet(t,e){return ot(this._tree,t,e)}get(t){let e=R(this._tree,t);return e!==void 0?e.get(p):void 0}has(t){let e=R(this._tree,t);return e!==void 0&&e.has(p)}keys(){return new z(this,q)}set(t,e){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,E(this._tree,t).set(p,e),this}get size(){if(this._size)return this._size;this._size=0;let t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,e){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;let s=E(this._tree,t);return s.set(p,e(s.get(p))),this}fetch(t,e){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;let s=E(this._tree,t),i=s.get(p);return i===void 0&&s.set(p,i=e()),i}values(){return new z(this,K)}[Symbol.iterator](){return this.entries()}static from(t){let e=new n;for(let[s,i]of t)e.set(s,i);return e}static fromObject(t){return n.from(Object.entries(t))}},V=(n,t,e=[])=>{if(t.length===0||n==null)return[n,e];for(let s of n.keys())if(s!==p&&t.startsWith(s))return e.push([n,s]),V(n.get(s),t.slice(s.length),e);return e.push([n,t]),V(void 0,"",e)},R=(n,t)=>{if(t.length===0||n==null)return n;for(let e of n.keys())if(e!==p&&t.startsWith(e))return R(n.get(e),t.slice(e.length))},E=(n,t)=>{let e=t.length;t:for(let s=0;n&&s<e;){for(let o of n.keys())if(o!==p&&t[s]===o[0]){let r=Math.min(e-s,o.length),c=1;for(;c<r&&t[s+c]===o[c];)++c;let d=n.get(o);if(c===o.length)n=d;else{let u=new Map;u.set(o.slice(c),d),n.set(t.slice(s,s+c),u),n.delete(o),n=u}s+=c;continue t}let i=new Map;return n.set(t.slice(s),i),i}return n},rt=(n,t)=>{let[e,s]=V(n,t);if(e!==void 0){if(e.delete(p),e.size===0)Y(s);else if(e.size===1){let[i,o]=e.entries().next().value;Z(s,i,o)}}},Y=n=>{if(n.length===0)return;let[t,e]=$(n);if(t.delete(e),t.size===0)Y(n.slice(0,-1));else if(t.size===1){let[s,i]=t.entries().next().value;s!==p&&Z(n.slice(0,-1),s,i)}},Z=(n,t,e)=>{if(n.length===0)return;let[s,i]=$(n);s.set(i+t,e),s.delete(i)},$=n=>n[n.length-1],P="or",H="and",ct="and_not",I=class n{constructor(t){if(t?.fields==null)throw new Error('MiniSearch: option "fields" must be provided');let e=t.autoVacuum==null||t.autoVacuum===!0?D:t.autoVacuum;this._options=Object.assign(Object.assign(Object.assign({},A),t),{autoVacuum:e,searchOptions:Object.assign(Object.assign({},J),t.searchOptions||{}),autoSuggestOptions:Object.assign(Object.assign({},lt),t.autoSuggestOptions||{})}),this._index=new v,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=N,this.addFields(this._options.fields)}add(t){let{extractField:e,tokenize:s,processTerm:i,fields:o,idField:r}=this._options,c=e(t,r);if(c==null)throw new Error(`MiniSearch: document does not have ID field "${r}"`);if(this._idToShortId.has(c))throw new Error(`MiniSearch: duplicate ID ${c}`);let d=this.addDocumentId(c);this.saveStoredFields(d,t);for(let u of o){let a=e(t,u);if(a==null)continue;let l=s(a.toString(),u),h=this._fieldIds[u],m=new Set(l).size;this.addFieldLength(d,h,this._documentCount-1,m);for(let _ of l){let f=i(_,u);if(Array.isArray(f))for(let g of f)this.addTerm(h,d,g);else f&&this.addTerm(h,d,f)}}}addAll(t){for(let e of t)this.add(e)}addAllAsync(t,e={}){let{chunkSize:s=10}=e,i={chunk:[],promise:Promise.resolve()},{chunk:o,promise:r}=t.reduce(({chunk:c,promise:d},u,a)=>(c.push(u),(a+1)%s===0?{chunk:[],promise:d.then(()=>new Promise(l=>setTimeout(l,0))).then(()=>this.addAll(c))}:{chunk:c,promise:d}),i);return r.then(()=>this.addAll(o))}remove(t){let{tokenize:e,processTerm:s,extractField:i,fields:o,idField:r}=this._options,c=i(t,r);if(c==null)throw new Error(`MiniSearch: document does not have ID field "${r}"`);let d=this._idToShortId.get(c);if(d==null)throw new Error(`MiniSearch: cannot remove document with ID ${c}: it is not in the index`);for(let u of o){let a=i(t,u);if(a==null)continue;let l=e(a.toString(),u),h=this._fieldIds[u],m=new Set(l).size;this.removeFieldLength(d,h,this._documentCount,m);for(let _ of l){let f=s(_,u);if(Array.isArray(f))for(let g of f)this.removeTerm(h,d,g);else f&&this.removeTerm(h,d,f)}}this._storedFields.delete(d),this._documentIds.delete(d),this._idToShortId.delete(c),this._fieldLength.delete(d),this._documentCount-=1}removeAll(t){if(t)for(let e of t)this.remove(e);else{if(arguments.length>0)throw new Error("Expected documents to be present. Omit the argument to remove all documents.");this._index=new v,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldLength=new Map,this._avgFieldLength=[],this._storedFields=new Map,this._nextId=0}}discard(t){let e=this._idToShortId.get(t);if(e==null)throw new Error(`MiniSearch: cannot discard document with ID ${t}: it is not in the index`);this._idToShortId.delete(t),this._documentIds.delete(e),this._storedFields.delete(e),(this._fieldLength.get(e)||[]).forEach((s,i)=>{this.removeFieldLength(e,i,this._documentCount,s)}),this._fieldLength.delete(e),this._documentCount-=1,this._dirtCount+=1,this.maybeAutoVacuum()}maybeAutoVacuum(){if(this._options.autoVacuum===!1)return;let{minDirtFactor:t,minDirtCount:e,batchSize:s,batchWait:i}=this._options.autoVacuum;this.conditionalVacuum({batchSize:s,batchWait:i},{minDirtCount:e,minDirtFactor:t})}discardAll(t){let e=this._options.autoVacuum;try{this._options.autoVacuum=!1;for(let s of t)this.discard(s)}finally{this._options.autoVacuum=e}this.maybeAutoVacuum()}replace(t){let{idField:e,extractField:s}=this._options,i=s(t,e);this.discard(i),this.add(t)}vacuum(t={}){return this.conditionalVacuum(t)}conditionalVacuum(t,e){return this._currentVacuum?(this._enqueuedVacuumConditions=this._enqueuedVacuumConditions&&e,this._enqueuedVacuum!=null?this._enqueuedVacuum:(this._enqueuedVacuum=this._currentVacuum.then(()=>{let s=this._enqueuedVacuumConditions;return this._enqueuedVacuumConditions=N,this.performVacuuming(t,s)}),this._enqueuedVacuum)):this.vacuumConditionsMet(e)===!1?Promise.resolve():(this._currentVacuum=this.performVacuuming(t),this._currentVacuum)}performVacuuming(t,e){return C(this,void 0,void 0,function*(){let s=this._dirtCount;if(this.vacuumConditionsMet(e)){let i=t.batchSize||W.batchSize,o=t.batchWait||W.batchWait,r=1;for(let[c,d]of this._index){for(let[u,a]of d)for(let[l]of a)this._documentIds.has(l)||(a.size<=1?d.delete(u):a.delete(l));this._index.get(c).size===0&&this._index.delete(c),r%i===0&&(yield new Promise(u=>setTimeout(u,o))),r+=1}this._dirtCount-=s}yield null,this._currentVacuum=this._enqueuedVacuum,this._enqueuedVacuum=null})}vacuumConditionsMet(t){if(t==null)return!0;let{minDirtCount:e,minDirtFactor:s}=t;return e=e||D.minDirtCount,s=s||D.minDirtFactor,this.dirtCount>=e&&this.dirtFactor>=s}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}has(t){return this._idToShortId.has(t)}getStoredFields(t){let e=this._idToShortId.get(t);if(e!=null)return this._storedFields.get(e)}search(t,e={}){let s=this.executeQuery(t,e),i=[];for(let[o,{score:r,terms:c,match:d}]of s){let u=c.length||1,a={id:this._documentIds.get(o),score:r*u,terms:Object.keys(d),queryTerms:c,match:d};Object.assign(a,this._storedFields.get(o)),(e.filter==null||e.filter(a))&&i.push(a)}return t===n.wildcard&&e.boostDocument==null&&this._options.searchOptions.boostDocument==null||i.sort(U),i}autoSuggest(t,e={}){e=Object.assign(Object.assign({},this._options.autoSuggestOptions),e);let s=new Map;for(let{score:o,terms:r}of this.search(t,e)){let c=r.join(" "),d=s.get(c);d!=null?(d.score+=o,d.count+=1):s.set(c,{score:o,terms:r,count:1})}let i=[];for(let[o,{score:r,terms:c,count:d}]of s)i.push({suggestion:o,terms:c,score:r/d});return i.sort(U),i}get documentCount(){return this._documentCount}get termCount(){return this._index.size}static loadJSON(t,e){if(e==null)throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return this.loadJS(JSON.parse(t),e)}static loadJSONAsync(t,e){return C(this,void 0,void 0,function*(){if(e==null)throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return this.loadJSAsync(JSON.parse(t),e)})}static getDefault(t){if(A.hasOwnProperty(t))return T(A,t);throw new Error(`MiniSearch: unknown option "${t}"`)}static loadJS(t,e){let{index:s,documentIds:i,fieldLength:o,storedFields:r,serializationVersion:c}=t,d=this.instantiateMiniSearch(t,e);d._documentIds=F(i),d._fieldLength=F(o),d._storedFields=F(r);for(let[u,a]of d._documentIds)d._idToShortId.set(a,u);for(let[u,a]of s){let l=new Map;for(let h of Object.keys(a)){let m=a[h];c===1&&(m=m.ds),l.set(parseInt(h,10),F(m))}d._index.set(u,l)}return d}static loadJSAsync(t,e){return C(this,void 0,void 0,function*(){let{index:s,documentIds:i,fieldLength:o,storedFields:r,serializationVersion:c}=t,d=this.instantiateMiniSearch(t,e);d._documentIds=yield k(i),d._fieldLength=yield k(o),d._storedFields=yield k(r);for(let[a,l]of d._documentIds)d._idToShortId.set(l,a);let u=0;for(let[a,l]of s){let h=new Map;for(let m of Object.keys(l)){let _=l[m];c===1&&(_=_.ds),h.set(parseInt(m,10),yield k(_))}++u%1e3===0&&(yield X(0)),d._index.set(a,h)}return d})}static instantiateMiniSearch(t,e){let{documentCount:s,nextId:i,fieldIds:o,averageFieldLength:r,dirtCount:c,serializationVersion:d}=t;if(d!==1&&d!==2)throw new Error("MiniSearch: cannot deserialize an index created with an incompatible version");let u=new n(e);return u._documentCount=s,u._nextId=i,u._idToShortId=new Map,u._fieldIds=o,u._avgFieldLength=r,u._dirtCount=c||0,u._index=new v,u}executeQuery(t,e={}){if(t===n.wildcard)return this.executeWildcardQuery(e);if(typeof t!="string"){let h=Object.assign(Object.assign(Object.assign({},e),t),{queries:void 0}),m=t.queries.map(_=>this.executeQuery(_,h));return this.combineResults(m,h.combineWith)}let{tokenize:s,processTerm:i,searchOptions:o}=this._options,r=Object.assign(Object.assign({tokenize:s,processTerm:i},o),e),{tokenize:c,processTerm:d}=r,l=c(t).flatMap(h=>d(h)).filter(h=>!!h).map(ht(r)).map(h=>this.executeQuerySpec(h,r));return this.combineResults(l,r.combineWith)}executeQuerySpec(t,e){let s=Object.assign(Object.assign({},this._options.searchOptions),e),i=(s.fields||this._options.fields).reduce((f,g)=>Object.assign(Object.assign({},f),{[g]:T(s.boost,g)||1}),{}),{boostDocument:o,weights:r,maxFuzzy:c,bm25:d}=s,{fuzzy:u,prefix:a}=Object.assign(Object.assign({},J.weights),r),l=this._index.get(t.term),h=this.termResults(t.term,t.term,1,t.termBoost,l,i,o,d),m,_;if(t.prefix&&(m=this._index.atPrefix(t.term)),t.fuzzy){let f=t.fuzzy===!0?.2:t.fuzzy,g=f<1?Math.min(c,Math.round(t.term.length*f)):f;g&&(_=this._index.fuzzyGet(t.term,g))}if(m)for(let[f,g]of m){let y=f.length-t.term.length;if(!y)continue;_?.delete(f);let w=a*f.length/(f.length+.3*y);this.termResults(t.term,f,w,t.termBoost,g,i,o,d,h)}if(_)for(let f of _.keys()){let[g,y]=_.get(f);if(!y)continue;let w=u*f.length/(f.length+y);this.termResults(t.term,f,w,t.termBoost,g,i,o,d,h)}return h}executeWildcardQuery(t){let e=new Map,s=Object.assign(Object.assign({},this._options.searchOptions),t);for(let[i,o]of this._documentIds){let r=s.boostDocument?s.boostDocument(o,"",this._storedFields.get(i)):1;e.set(i,{score:r,terms:[],match:{}})}return e}combineResults(t,e=P){if(t.length===0)return new Map;let s=e.toLowerCase(),i=dt[s];if(!i)throw new Error(`Invalid combination operator: ${e}`);return t.reduce(i)||new Map}toJSON(){let t=[];for(let[e,s]of this._index){let i={};for(let[o,r]of s)i[o]=Object.fromEntries(r);t.push([e,i])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}termResults(t,e,s,i,o,r,c,d,u=new Map){if(o==null)return u;for(let a of Object.keys(r)){let l=r[a],h=this._fieldIds[a],m=o.get(h);if(m==null)continue;let _=m.size,f=this._avgFieldLength[h];for(let g of m.keys()){if(!this._documentIds.has(g)){this.removeTerm(h,g,e),_-=1;continue}let y=c?c(this._documentIds.get(g),e,this._storedFields.get(g)):1;if(!y)continue;let w=m.get(g),j=this._fieldLength.get(g)[h],L=at(w,_,this._documentCount,j,f,d),O=s*i*l*y*L,b=u.get(g);if(b){b.score+=O,ft(b.terms,t);let x=T(b.match,e);x?x.push(a):b.match[e]=[a]}else u.set(g,{score:O,terms:[t],match:{[e]:[a]}})}}return u}addTerm(t,e,s){let i=this._index.fetch(s,B),o=i.get(t);if(o==null)o=new Map,o.set(e,1),i.set(t,o);else{let r=o.get(e);o.set(e,(r||0)+1)}}removeTerm(t,e,s){if(!this._index.has(s)){this.warnDocumentChanged(e,t,s);return}let i=this._index.fetch(s,B),o=i.get(t);o==null||o.get(e)==null?this.warnDocumentChanged(e,t,s):o.get(e)<=1?o.size<=1?i.delete(t):o.delete(e):o.set(e,o.get(e)-1),this._index.get(s).size===0&&this._index.delete(s)}warnDocumentChanged(t,e,s){for(let i of Object.keys(this._fieldIds))if(this._fieldIds[i]===e){this._options.logger("warn",`MiniSearch: document with ID ${this._documentIds.get(t)} has changed before removal: term "${s}" was not present in field "${i}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}}addDocumentId(t){let e=this._nextId;return this._idToShortId.set(t,e),this._documentIds.set(e,t),this._documentCount+=1,this._nextId+=1,e}addFields(t){for(let e=0;e<t.length;e++)this._fieldIds[t[e]]=e}addFieldLength(t,e,s,i){let o=this._fieldLength.get(t);o==null&&this._fieldLength.set(t,o=[]),o[e]=i;let c=(this._avgFieldLength[e]||0)*s+i;this._avgFieldLength[e]=c/(s+1)}removeFieldLength(t,e,s,i){if(s===1){this._avgFieldLength[e]=0;return}let o=this._avgFieldLength[e]*s-i;this._avgFieldLength[e]=o/(s-1)}saveStoredFields(t,e){let{storeFields:s,extractField:i}=this._options;if(s==null||s.length===0)return;let o=this._storedFields.get(t);o==null&&this._storedFields.set(t,o={});for(let r of s){let c=i(e,r);c!==void 0&&(o[r]=c)}}};I.wildcard=Symbol("*");var T=(n,t)=>Object.prototype.hasOwnProperty.call(n,t)?n[t]:void 0,dt={[P]:(n,t)=>{for(let e of t.keys()){let s=n.get(e);if(s==null)n.set(e,t.get(e));else{let{score:i,terms:o,match:r}=t.get(e);s.score=s.score+i,s.match=Object.assign(s.match,r),Q(s.terms,o)}}return n},[H]:(n,t)=>{let e=new Map;for(let s of t.keys()){let i=n.get(s);if(i==null)continue;let{score:o,terms:r,match:c}=t.get(s);Q(i.terms,r),e.set(s,{score:i.score+o,terms:i.terms,match:Object.assign(i.match,c)})}return e},[ct]:(n,t)=>{for(let e of t.keys())n.delete(e);return n}},ut={k:1.2,b:.7,d:.5},at=(n,t,e,s,i,o)=>{let{k:r,b:c,d}=o;return Math.log(1+(e-t+.5)/(t+.5))*(d+n*(r+1)/(n+r*(1-c+c*s/i)))},ht=n=>(t,e,s)=>{let i=typeof n.fuzzy=="function"?n.fuzzy(t,e,s):n.fuzzy||!1,o=typeof n.prefix=="function"?n.prefix(t,e,s):n.prefix===!0,r=typeof n.boostTerm=="function"?n.boostTerm(t,e,s):1;return{term:t,fuzzy:i,prefix:o,termBoost:r}},A={idField:"id",extractField:(n,t)=>n[t],tokenize:n=>n.split(mt),processTerm:n=>n.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(n,t)=>{typeof console?.[n]=="function"&&console[n](t)},autoVacuum:!0},J={combineWith:P,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:ut},lt={combineWith:H,prefix:(n,t,e)=>t===e.length-1},W={batchSize:1e3,batchWait:10},N={minDirtFactor:.1,minDirtCount:20},D=Object.assign(Object.assign({},W),N),ft=(n,t)=>{n.includes(t)||n.push(t)},Q=(n,t)=>{for(let e of t)n.includes(e)||n.push(e)},U=({score:n},{score:t})=>t-n,B=()=>new Map,F=n=>{let t=new Map;for(let e of Object.keys(n))t.set(parseInt(e,10),n[e]);return t},k=n=>C(void 0,void 0,void 0,function*(){let t=new Map,e=0;for(let s of Object.keys(n))t.set(parseInt(s,10),n[s]),++e%1e3===0&&(yield X(0));return t}),X=n=>new Promise(t=>setTimeout(t,n)),mt=/[\n\r\p{Z}\p{P}]+/u;var tt="$collection-search";var et="minisearch-index.json";var M,st="",nt=async()=>{if(!M){let n=await fetch(new URL(`${tt}/${et}`,st));if(n.ok){let{index:t,fields:e,storeFields:s}=await n.json();M=I.loadJS(t,{fields:e,storeFields:s})}}},_t=async n=>{if(M||await nt(),!M){let e={type:"search-error",message:"failed to load search index",transaction:n.transaction};postMessage(e);return}let t={type:"search-results",list:M.search(n.query,n.options),transaction:n.transaction};postMessage(t)};onmessage=n=>{if(typeof n.data=="object")switch(n.data.type){case"search":_t(n.data);return;case"init":st=n.data.base_uri,nt();return}console.info({event:n})};})();
