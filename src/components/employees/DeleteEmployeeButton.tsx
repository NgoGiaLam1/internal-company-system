"use client";

import { useRouter } from "next/navigation";

export default function DeleteEmployeeButton({
employeeId
}:{
employeeId:string;
}){

const router=
useRouter();

const remove=
async()=>{

const ok=
confirm(
"Xóa nhân viên này?"
);

if(!ok)
return;

const res=
await fetch(
`/api/employees/${employeeId}`,
{
method:"DELETE"
}
);

if(!res.ok)
return;

router.push(
"/employees"
);

router.refresh();

};

return(

<button

onClick={remove}

className="
px-4
py-2
rounded-xl
bg-red-50
text-red-600
hover:bg-red-100
transition
"

>

Xóa nhân viên

</button>

);

}