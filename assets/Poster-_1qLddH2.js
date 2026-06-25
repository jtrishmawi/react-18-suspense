import{i as e,n as t,r as n,t as r}from"./index-D6xdccQu.js";var i=e(n());function a(e){let t=`pending`,n,r=e().then(e=>{t=`success`,n=e},e=>{t=`error`,n=e});return{read(){switch(t){case`pending`:throw r;case`error`:throw n;case`success`:return n}}}}var o=new Map;function s(e=``){let t=o.get(e);return t||(t=a(()=>new Promise(t=>{let n=new window.Image;n.src=e,n.addEventListener(`load`,()=>t(e)),n.addEventListener(`error`,()=>t(``))})),o.set(e,t),t)}var c=t();function l(e){return s(e.src).read(),(0,c.jsx)(`img`,{...e,loading:`lazy`})}var u=r.div`
  position: relative;
`,d=r(l)`
  object-fit: fill;
  width: 100%;
  height: 100%;
`,f=r.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.65);
  padding: 0.5rem;
  ${({visible:e})=>e?`visibility: visible;
    opacity: 1;
    transition: visibility 0s ease-in 0s, opacity 300ms;`:`visibility: hidden;
  opacity: 0;
  transition: visibility 0s ease-out 300ms, opacity 300ms;`}
`,p=({movie:e})=>{let[t,n]=(0,i.useState)(!1);return(0,c.jsxs)(u,{onMouseEnter:(0,i.useCallback)(()=>n(!0),[]),onMouseLeave:(0,i.useCallback)(()=>n(!1),[]),children:[(0,c.jsx)(d,{alt:e.title??e.name,src:e.poster_path}),(0,c.jsx)(f,{visible:t,children:(0,c.jsx)(`h3`,{children:e.title??e.name})})]})};export{p as default};