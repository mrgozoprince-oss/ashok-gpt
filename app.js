const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const panelNames = {chat:"AI Chat",coding:"Coding Lab",mods:"Mod & Plugin Maker",assets:"Texture & Assets",video:"Motion Video Studio",memory:"Memory"};
function showPanel(name){
  $$(".panel").forEach(p=>p.classList.toggle("show",p.id===`panel-${name}`));
  $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.panel===name));
  $("#pageTitle").textContent=panelNames[name]||"ASHOK GPT";
  $("#sidebar").classList.remove("open");
}
$$(".nav-item").forEach(b=>b.addEventListener("click",()=>showPanel(b.dataset.panel)));
$("#menuBtn").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#newChat").addEventListener("click",()=>{ $("#chatArea").innerHTML=""; showPanel("chat"); $("#prompt").focus(); });
function addMessage(text,kind){
  const el=document.createElement("div");el.className=`message ${kind}`;
  const label=document.createElement("b");label.textContent=kind==="user"?"YOU":"ASHOK GPT";
  const p=document.createElement("p");p.textContent=text;el.append(label,p);$("#chatArea").append(el);el.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function submitPrompt(text){
  if(!text.trim())return;
  showPanel("chat");addMessage(text,"user");
  addMessage("This is the UI prototype, not a connected AI yet. Next, connect a model through a secure backend. Never put private API keys in this browser code.","assistant");
  $("#prompt").value="";
}
$("#chatForm").addEventListener("submit",e=>{e.preventDefault();submitPrompt($("#prompt").value)});
$$("[data-prompt]").forEach(b=>b.addEventListener("click",()=>submitPrompt(b.dataset.prompt)));
$("#pickFile").addEventListener("click",()=>$("#fileInput").click());
$("#fileInput").addEventListener("change",e=>{const f=e.target.files[0];if(f)addMessage(`Selected file: ${f.name} (${Math.round(f.size/1024)} KB). File contents are not uploaded or analyzed in this prototype.`,"user")});
const STORAGE_KEY="ashok-gpt-memory-v1";
function getMemories(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")}catch{return []}}
function renderMemories(){
  const root=$("#memoryList");root.innerHTML="";
  getMemories().forEach((m,i)=>{
    const row=document.createElement("div");row.className="memory-item";
    const text=document.createElement("span");text.textContent=m;
    const del=document.createElement("button");del.className="delete-memory";del.textContent="Delete";
    del.addEventListener("click",()=>{const a=getMemories();a.splice(i,1);localStorage.setItem(STORAGE_KEY,JSON.stringify(a));renderMemories()});
    row.append(text,del);root.append(row);
  });
}
$("#memoryForm").addEventListener("submit",e=>{e.preventDefault();const value=$("#memoryText").value.trim();if(!value)return;const a=getMemories();a.unshift(value);localStorage.setItem(STORAGE_KEY,JSON.stringify(a.slice(0,100)));$("#memoryText").value="";renderMemories()});
renderMemories();
if("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(()=>{});

// Multi-AI Hub demo selector. It changes the selected UI state only; no provider is connected yet.
$$(".model-select").forEach(button => button.addEventListener("click", () => {
  $$(".model-select").forEach(b => { b.textContent = "Select"; b.classList.remove("chosen"); });
  button.textContent = "Selected ✓";
  button.classList.add("chosen");
  $("#selectedModel").textContent = `Selected provider: ${button.dataset.model} (demo only — backend connection required)`;
}));
