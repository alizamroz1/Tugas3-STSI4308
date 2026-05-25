import{W as r,q as s,p as a,P as i,u as m}from"./index-WMDzCNZv.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const p=()=>{const t=window;t.addEventListener("statusTap",()=>{r(()=>{const n=document.elementFromPoint(t.innerWidth/2,t.innerHeight/2);if(!n)return;const e=s(n);e&&new Promise(o=>a(e,o)).then(()=>{i(async()=>{e.style.setProperty("--overflow","hidden"),await m(e,300),e.style.removeProperty("--overflow")})})})})};export{p as startStatusTap};
