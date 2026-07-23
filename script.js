// ===============================
// LEAD FORM
// ===============================

document.addEventListener(
"DOMContentLoaded",
()=>{

const leadForm =
document.getElementById(
"leadForm"
);

if(leadForm){

leadForm.addEventListener(
"submit",
function(e){

e.preventDefault();

alert(
"Lead submitted successfully!"
);

this.reset();

});

}

});

// ===============================
// TABLE SEARCH
// ===============================

function searchTable(){

const input =
document.getElementById(
"searchInput"
);

if(!input) return;

const filter =
input.value.toUpperCase();

const table =
document.getElementById(
"leadTable"
);

if(!table) return;

const tr =
table.getElementsByTagName(
"tr"
);

for(
let i=1;
i<tr.length;
i++
){

let found=false;

const td=
tr[i].getElementsByTagName(
"td"
);

for(
let j=0;
j<td.length;
j++
){

if(td[j]){

const txt=
td[j].textContent ||
td[j].innerText;

if(
txt.toUpperCase()
.indexOf(filter)>-1
){
found=true;
}

}

}

tr[i].style.display=
found?"":"none";

}

}

// ===============================
// SIDEBAR
// ===============================

const sidebar =
document.getElementById(
"sidebar"
);

const trigger =
document.querySelector(
".sidebar-trigger"
);

if(
sidebar &&
trigger
){

trigger.addEventListener(
"mouseenter",
()=>{

sidebar.classList.add(
"active"
);

}
);

document.addEventListener(
"mousemove",
(e)=>{

if(
e.clientX > 280 &&
!sidebar.matches(
":hover"
)
){

sidebar.classList.remove(
"active"
);

}

}
);

}