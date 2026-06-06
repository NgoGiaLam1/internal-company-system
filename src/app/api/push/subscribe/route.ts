import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
 req:Request
){

 try{

  const body =
  await req.json();

  const {
   employeeId,
   endpoint,
   keys
  } = body;

  await prisma
  .tblPushSubscription
  .upsert({

   where:{
    endpoint
   },

   update:{
    p256dh:keys.p256dh,
    auth:keys.auth
   },

   create:{
    employeeId,
    endpoint,
    p256dh:keys.p256dh,
    auth:keys.auth
   }

  });

  return NextResponse.json(
   {success:true}
  );

 }

 catch{

  return NextResponse.json(
   {message:"error"},
   {status:500}
  );

 }

}