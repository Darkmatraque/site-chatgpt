const projects=[
{id:"01",title:"Lifehub",category:"web",label:"Personal OS",desc:"Un espace de vie numérique qui rassemble tâches, notes, calendrier, budget, objectifs et journal dans une seule expérience.",stack:["React","TypeScript","Vite","Zustand"],visual:"lines",repo:"Lifehub"},
{id:"02",title:"Chess-Goat",category:"game",label:"Game / Web",desc:"Une expérience d'échecs pensée comme un terrain de jeu : rapide, lisible et faite pour donner envie de rejouer.",stack:["TypeScript","Game logic","UI"],visual:"chess",repo:"Chess-Goat"},
{id:"03",title:"Darkmusic",category:"web",label:"Music interface",desc:"Une interface musicale sombre et immersive, conçue autour du rythme, de la navigation et du plaisir d'écoute.",stack:["Web","Audio","UI"],visual:"music",repo:"Darkmusic"},
{id:"04",title:"Space Shooter",category:"game",label:"Arcade",desc:"Un shooter spatial nerveux : boucle de gameplay courte, feedback immédiat et esthétique rétro-futuriste.",stack:["JavaScript","Canvas","Game"],visual:"space",repo:"space-shooter"},
{id:"05",title:"RH Docs Generator",category:"tool",label:"Automation",desc:"Un générateur de documents RH qui transforme des données structurées en documents propres et répétables.",stack:["Python","Automation","Docs"],visual:"doc",repo:"rh-docs-generator"},
{id:"06",title:"Himalaya Momo",category:"web",label:"Website",desc:"Un univers web chaleureux pour un projet culinaire, avec une identité plus proche d'un lieu que d'un simple site vitrine.",stack:["Web","Design","Content"],visual:"pixels",repo:"himalaya-momo-website"},
{id:"07",title:"Minecraft",category:"game",label:"Experiment",desc:"Une plongée dans l'écosystème Minecraft : modding, expérimentation et construction de systèmes.",stack:["Java","Minecraft","Mods"],visual:"space",repo:"minecraft"},
{id:"08",title:"Suisse / Tibet",category:"web",label:"Culture & memory",desc:"Des expériences éditoriales autour de la mémoire, de la culture et des récits qui méritent de rester accessibles.",stack:["Web","Editorial","Story"],visual:"pixels",repo:"Suisse"},
{id:"09",title:"ListenTogether",category:"tool",label:"Realtime",desc:"Une expérience de synchronisation musicale pensée pour écouter ensemble, avec une attention particulière aux données et à la confidentialité.",stack:["Web","Realtime","Supabase"],visual:"music",repo:"darkmatraque.github.io"}
];

const grid=document.querySelector("#projectGrid"),dialog=document.querySelector("#projectDialog"),commandDialog=document.querySelector("#commandDialog"),commandInput=document.querySelector("#commandInput");
let activeFilter="all";

function visual(type){
 if(type==="lines")return '<div class="project-visual visual-lines"><div class="visual-lines"></div><div class="visual-sphere"></div></div>';
 if(type==="chess")return '<div class="project-visual visual-chess"><div class="visual-chess"></div></div>';
 if(type==="music")return '<div class="project-visual visual-music"><div class="visual-music"></div></div>';
 if(type==="space")return '<div class="project-visual visual-space"><div class="visual-space"></div></div>';
 if(type==="doc")return '<div class="project-visual visual-doc"><div class="visual-doc"></div></div>';
 return '<div class="project-visual visual-pixels"><div class="visual-pixels"></div></div>';
}
function render(){
 const visible=projects.filter(function(p){return activeFilter==="all"||p.category===activeFilter});
 grid.innerHTML=visible.map(function(p){return '<article class="project" data-id="'+p.id+'" tabindex="0" aria-label="Ouvrir '+p.title+'"><span class="project-index">'+p.id+' / '+String(projects.length).padStart(2,"0")+'</span>'+visual(p.visual)+'<span class="project-category">'+p.label+'</span><h3>'+p.title+'</h3><p>'+p.desc+'</p><span class="project-arrow">↗</span></article>'}).join("");
 grid.querySelectorAll(".project").forEach(function(el){
  el.addEventListener("click",function(){openProject(el.dataset.id)});
  el.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" ")openProject(el.dataset.id)});
 });
}
function openProject(id){
 const p=projects.find(function(x){return x.id===id});if(!p)return;
 document.querySelector("#dialogCategory").textContent=p.label;
 document.querySelector("#dialogNumber").textContent=p.id+" / "+projects.length;
 document.querySelector("#dialogTitle").textContent=p.title;
 document.querySelector("#dialogDescription").textContent=p.desc;
 document.querySelector("#dialogMeta").innerHTML=p.stack.map(function(s){return "<span>"+s+"</span>"}).join("");
 document.querySelector("#dialogLink").href="https://github.com/Darkmatraque/"+p.repo;
 dialog.showModal();
}
document.querySelectorAll(".filter").forEach(function(btn){btn.addEventListener("click",function(){
 document.querySelectorAll(".filter").forEach(function(b){b.classList.remove("active")});
 btn.classList.add("active");activeFilter=btn.dataset.filter;render();
})});
document.querySelector("#closeDialog").onclick=function(){dialog.close()};
dialog.addEventListener("click",function(e){if(e.target===dialog)dialog.close()});
function randomProject(){openProject(projects[Math.floor(Math.random()*projects.length)].id)}
document.querySelector("#randomBtn").onclick=randomProject;
document.querySelector("#commandBtn").onclick=function(){commandDialog.showModal();setTimeout(function(){commandInput.focus()},50)};
commandDialog.addEventListener("click",function(e){if(e.target===commandDialog)commandDialog.close()});
document.querySelectorAll("[data-command]").forEach(function(btn){btn.addEventListener("click",function(){runCommand(btn.dataset.command)})});
function runCommand(cmd){
 commandDialog.close();
 if(cmd==="work")document.querySelector("#work").scrollIntoView({behavior:"smooth"});
 if(cmd==="random")randomProject();
 if(cmd==="contact")document.querySelector("#contact").scrollIntoView({behavior:"smooth"});
 if(cmd==="top")window.scrollTo({top:0,behavior:"smooth"});
}
commandInput.addEventListener("input",function(){
 const q=commandInput.value.toLowerCase();
 document.querySelectorAll(".command-list button").forEach(function(b){b.hidden=!b.textContent.toLowerCase().includes(q)});
});
document.addEventListener("keydown",function(e){
 if(e.key==="Escape"){dialog.close();commandDialog.close()}
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();commandDialog.showModal();commandInput.focus()}
});
let keyBuffer="";
document.addEventListener("keydown",function(e){
 if(["INPUT","TEXTAREA"].includes(document.activeElement.tagName))return;
 keyBuffer=(keyBuffer+e.key.toLowerCase()).slice(-2);
 if(keyBuffer==="rw"||e.key.toLowerCase()==="r")randomProject();
 if(keyBuffer==="gc")document.querySelector("#contact").scrollIntoView({behavior:"smooth"});
 if(keyBuffer==="gw")document.querySelector("#work").scrollIntoView({behavior:"smooth"});
 if(keyBuffer==="gt")window.scrollTo({top:0,behavior:"smooth"});
});
const cursor=document.querySelector(".cursor"),dot=document.querySelector(".cursor-dot");
window.addEventListener("pointermove",function(e){cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px";dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px"});
function cursorTargets(){document.querySelectorAll("a,button,.project").forEach(function(el){
 el.addEventListener("mouseenter",function(){cursor.style.width="54px";cursor.style.height="54px"});
 el.addEventListener("mouseleave",function(){cursor.style.width="34px";cursor.style.height="34px"});
})}
const signals=["BUILDING SOMETHING UNNECESSARILY GOOD","TURNING IDEAS INTO INTERFACES","BREAKING THE THING TO UNDERSTAND IT","POLISHING THE LAST 5%","SHIPPING, THEN LEARNING"];
let si=0;
setInterval(function(){si=(si+1)%signals.length;const el=document.querySelector("#signalText");el.animate([{opacity:1},{opacity:0},{opacity:1}],{duration:500});setTimeout(function(){el.textContent=signals[si]},220)},5000);
function clock(){document.querySelector("#localTime").textContent=new Intl.DateTimeFormat("fr-CH",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false,timeZone:"Europe/Zurich"}).format(new Date())}
setInterval(clock,1000);clock();document.querySelector("#year").textContent=new Date().getFullYear();render();cursorTargets();