(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{52091:function(e,t,n){Promise.resolve().then(n.bind(n,45095))},50551:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r}});let l=n(99920);n(57437),n(2265);let u=l._(n(40148));function r(e,t){var n;let l={loading:e=>{let{error:t,isLoading:n,pastDelay:l}=e;return null}};"function"==typeof e&&(l.loader=e);let r={...l,...t};return(0,u.default)({...r,modules:null==(n=r.loadableGenerated)?void 0:n.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},10912:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return u}});let l=n(55592);function u(e){let{reason:t,children:n}=e;if("undefined"==typeof window)throw new l.BailoutToCSRError(t);return n}},40148:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let l=n(57437),u=n(2265),r=n(10912),o=n(61481);function i(e){return{default:e&&"default"in e?e.default:e}}let a={loader:()=>Promise.resolve(i(()=>null)),loading:null,ssr:!0},s=function(e){let t={...a,...e},n=(0,u.lazy)(()=>t.loader().then(i)),s=t.loading;function d(e){let i=s?(0,l.jsx)(s,{isLoading:!0,pastDelay:!0,error:null}):null,a=t.ssr?(0,l.jsxs)(l.Fragment,{children:["undefined"==typeof window?(0,l.jsx)(o.PreloadCss,{moduleIds:t.modules}):null,(0,l.jsx)(n,{...e})]}):(0,l.jsx)(r.BailoutToCSR,{reason:"next/dynamic",children:(0,l.jsx)(n,{...e})});return(0,l.jsx)(u.Suspense,{fallback:i,children:a})}return d.displayName="LoadableComponent",d}},61481:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return r}});let l=n(57437),u=n(58512);function r(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let n=(0,u.getExpectedRequestStore)("next/dynamic css"),r=[];if(n.reactLoadableManifest&&t){let e=n.reactLoadableManifest;for(let n of t){if(!e[n])continue;let t=e[n].files.filter(e=>e.endsWith(".css"));r.push(...t)}}return 0===r.length?null:(0,l.jsx)(l.Fragment,{children:r.map(e=>(0,l.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:n.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}},45095:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var l=n(57437),u=n(2265),r=n(50551),o=n.n(r);n(68146);let i=o()(()=>Promise.all([n.e(155),n.e(354),n.e(510)]).then(n.bind(n,3844)).then(e=>e.default),{loadableGenerated:{webpack:()=>[null]},ssr:!1});function a(){let[e,t]=(0,u.useState)(null);return((0,u.useEffect)(()=>{(async function(){let e=await fetch("/api/swagger");t(await e.json())})()},[]),e)?(0,l.jsx)(i,{spec:e}):(0,l.jsx)("div",{children:"Loading..."})}},68146:function(){}},function(e){e.O(0,[675,971,23,744],function(){return e(e.s=52091)}),_N_E=e.O()}]);