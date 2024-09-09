"use strict";(()=>{var e={};e.id=511,e.ids=[511],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27813:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>N,patchFetch:()=>y,requestAsyncStorage:()=>v,routeModule:()=>l,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m});var s={};r.r(s),r.d(s,{DELETE:()=>h,GET:()=>u,PATCH:()=>d,POST:()=>p});var i=r(67092),n=r(25932),c=r(94147),a=r(77856);let o=new(r(53524)).PrismaClient;async function u(){try{let e=await o.techService.findMany();return a.NextResponse.json(e)}catch(e){return a.NextResponse.json({error:"Error fetching tech services"},{status:500})}}async function p(e){try{let{description:t,status:r,clientId:s,deviceType:i,serialNumber:n,technicianId:c}=await e.json(),u=await o.techService.create({data:{description:t,status:r,clientId:Number(s),deviceType:i,serialNumber:n,technicianId:Number(c)}});return a.NextResponse.json(u,{status:201})}catch(e){return a.NextResponse.json({error:"Error creating tech service"},{status:500})}}async function d(e){try{let{id:t,...r}=await e.json(),s=await o.techService.update({where:{id:Number(t)},data:{...r.description&&{description:r.description},...r.status&&{status:r.status},...r.clientId&&{clientId:Number(r.clientId)},...r.deviceType&&{deviceType:r.deviceType},...r.serialNumber&&{serialNumber:r.serialNumber},...r.technicianId&&{technicianId:Number(r.technicianId)}}});return a.NextResponse.json(s)}catch(e){return a.NextResponse.json({error:"Error updating tech service"},{status:500})}}async function h(e){try{let{id:t}=await e.json();return await o.techService.delete({where:{id:Number(t)}}),a.NextResponse.json({message:"Tech service deleted successfully"})}catch(e){return a.NextResponse.json({error:"Error deleting tech service"},{status:500})}}let l=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/techservice/route",pathname:"/api/techservice",filename:"route",bundlePath:"app/api/techservice/route"},resolvedPagePath:"C:\\Users\\Lenovo\\Desktop\\doctorcelweb\\doctorcelweb\\src\\app\\api\\techservice\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:v,staticGenerationAsyncStorage:m,serverHooks:x}=l,N="/api/techservice/route";function y(){return(0,c.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:m})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[424,965],()=>r(27813));module.exports=s})();