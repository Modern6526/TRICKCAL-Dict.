const $=s=>document.querySelector(s), search=$('#search'), results=$('#results'), cats=$('#categories'), count=$('#count'), notice=$('#notice');
let entries=[], category='すべて';
const candidates=e=>Array.isArray(e.candidates)?e.candidates.filter(Boolean):[e.ja,e.en,e.ko].filter(Boolean);
const lines=list=>list.flatMap(e=>candidates(e).map(c=>`${e.reading}\t${c}\t${e.pos||'名詞'}`)).join('\r\n');
function say(t){notice.textContent=t}
async function copy(t){try{await navigator.clipboard.writeText(t);say('コピーしました。')}catch{say('コピーできませんでした。ブラウザの権限を確認してください。')}}
function download(t){const b=new Uint8Array(2+t.length*2);b[0]=255;b[1]=254;for(let i=0;i<t.length;i++){let c=t.charCodeAt(i);b[2+i*2]=c&255;b[3+i*2]=c>>8}const u=URL.createObjectURL(new Blob([b],{type:'text/plain'}));const a=document.createElement('a');a.href=u;a.download='trickcal_ime_dictionary.txt';a.click();URL.revokeObjectURL(u);say('IME辞書ファイルを作成しました。')}
function filtered(){let q=search.value.trim().toLocaleLowerCase();return entries.filter(e=>(category==='すべて'||(e.category||'その他')===category)&&(!q||[e.reading,...candidates(e),e.category||''].join(' ').toLocaleLowerCase().includes(q)))}
function render(){cats.replaceChildren();['すべて',...new Set(entries.map(e=>e.category||'その他'))].forEach(n=>{let b=document.createElement('button');b.className='category'+(category===n?' active':'');b.textContent=n;b.onclick=()=>{category=n;render()};cats.append(b)});
let list=filtered();count.textContent=`${list.length} / ${entries.length} 件`;results.replaceChildren();
if(!list.length){let p=document.createElement('p');p.className='empty';p.textContent='該当する用語が見つかりませんでした。';results.append(p)}
list.forEach(e=>{let card=document.createElement('article');card.className='entry';let top=document.createElement('div');top.className='entrytop';let h=document.createElement('h2');h.textContent=e.reading;let tag=document.createElement('span');tag.className='tag';tag.textContent=e.category||'その他';top.append(h,tag);card.append(top);
candidates(e).forEach(c=>{let p=document.createElement('p');p.className='candidate';p.textContent=c;card.append(p)});
let bottom=document.createElement('div');bottom.className='entrybottom';let b=document.createElement('button');b.textContent='この用語をコピー';b.onclick=()=>copy(lines([e]));bottom.append(b);card.append(bottom);results.append(card)});
$('#copy-all').disabled=!list.length;$('#download-all').disabled=!list.length}
search.addEventListener('input',render);$('#copy-all').onclick=()=>copy(lines(filtered()));$('#download-all').onclick=()=>download(lines(filtered()));
fetch('data/dictionary.json').then(r=>{if(!r.ok)throw Error('辞書ファイルを読み込めません');return r.json()}).then(d=>{if(!Array.isArray(d))throw Error('辞書データの形式が正しくありません');entries=d.filter(e=>e&&e.reading);render()}).catch(e=>{results.textContent=e.message+'。data/dictionary.json を確認してください。'});
