function e(e,t){return new Promise(((n,o)=>{const i=Math.random()>.3;setTimeout((()=>{i?n({position:e,delayTime:t}):o({position:e,delayTime:t})}),t)}))}function t(e,t){const n=document.createElement("div");n.classList.add("notification",t),n.textContent=e,document.body.append(n),setTimeout((()=>{n.remove()}),3e3)}document.querySelector(".form").addEventListener("submit",(function(n){n.preventDefault();const o=Number(n.target.elements.delay.value),i=Number(n.target.elements.step.value),m=Number(n.target.elements.amount.value);for(let n=1;n<=m;n++){e(n,o+i*(n-1)).then((({position:e,delayTime:n})=>{t(`✅ Fulfilled promise ${e} in ${n}ms`,"success")})).catch((({position:e,delayTime:n})=>{t(`❌ Rejected promise ${e} in ${n}ms`,"failure")}))}}));
//# sourceMappingURL=03-promises.fe7f6afb.js.map