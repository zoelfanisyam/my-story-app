var $=t=>{throw TypeError(t)};var D=(t,e,n)=>e.has(t)||$("Cannot "+n);var l=(t,e,n)=>(D(t,e,"read from private field"),n?n.call(t):e.get(t)),f=(t,e,n)=>e.has(t)?$("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),E=(t,e,n,r)=>(D(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),F=(t,e,n)=>(D(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Y={BASE_URL:"https://story-api.dicoding.dev/v1"},k={BASE_URL:Y.BASE_URL};function Q(){return localStorage.getItem("token")}const X={async register(t,e,n){const r=await fetch(k.BASE_URL+"/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,password:n})}),a=await r.json();if(!r.ok)throw new Error(a.message||"Failed to register");return a}},Z={async login(t,e){const n=await fetch(k.BASE_URL+"/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),r=await n.json();if(!n.ok)throw new Error(r.message||"Login failed");return r}};async function ee(t=1,e=7,n=0,r=localStorage.getItem("token")){const a=new URLSearchParams;t!==void 0&&a.append("page",t),e!==void 0&&a.append("size",e),n!==void 0&&a.append("location",n);const i=await fetch(`${k.BASE_URL}/stories?${a.toString()}`,{method:"GET",headers:{Authorization:"Bearer "+r}}),o=await i.json();if(!i.ok)throw new Error(o.message||"Failed to fetch stories");return o}async function te(t,e=localStorage.getItem("token")){const n=await fetch(`${k.BASE_URL}/stories/${t}`,{method:"GET",headers:{Authorization:`Bearer ${e}`}}),r=await n.json();if(!n.ok)throw new Error(r.message||"Failed to fetch story detail");return r}async function ne(t,e,n,r){const a=Q(),i=await(await fetch(t)).blob(),o=new File([i],"photo.jpg",{type:i.type}),c=new FormData;c.append("photo",o),c.append("description",e),n&&c.append("lat",parseFloat(n)),r&&c.append("lon",parseFloat(r));const s=await fetch("https://story-api.dicoding.dev/v1/stories",{method:"POST",headers:{Authorization:`Bearer ${a}`},body:c}),d=await s.json();if(!s.ok)throw new Error(d.message);return d}class re{constructor(e){this.presenter=e}render(){return`
      <section class="auth-section">
        <h1>Login Page</h1>
        <form id="loginForm">
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" required placeholder="Enter your email" />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" required placeholder="Enter your password" />
          </div>
          <a href="/#/register">Register</a>
          <button type="submit">Login</button>
        </form>
        <p id="loginMessage"></p>
      </section>
    `}afterRender(){document.querySelector("header").style.display="none",document.querySelector("footer").style.display="none";const e=document.getElementById("loginForm");e.addEventListener("submit",n=>{n.preventDefault();const r=e.email.value,a=e.password.value;this.presenter.handleLogin(r,a)})}showMessage(e,n){const r=document.getElementById("loginMessage");r.innerText=e,r.style.color=n?"green":"red"}}class ae{constructor(){this.view=new re(this)}async render(){return this.view.render()}async afterRender(){this.view.afterRender()}async handleLogin(e,n){try{const r=await Z.login(e,n);localStorage.setItem("token",r.loginResult.token),this.view.showMessage(`✅ ${r.message}`,!0),document.startViewTransition?document.startViewTransition(()=>{window.location.hash="/home"}):window.location.hash="/home"}catch(r){this.view.showMessage(`❌ ${r.message}`,!1)}}}class ie{constructor(e){this.presenter=e}render(){return`
      <section class="auth-section">
        <h1>Register User</h1>
        <form id="registerForm">
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" required minlength="8" />
          </div>
          <a href="/login">Login</a>
          <button type="submit">Register</button>
        </form>
        <p id="message"></p>
      </section>
    `}afterRender(){document.querySelector("header").style.display="none",document.querySelector("footer").style.display="none",document.getElementById("registerForm").addEventListener("submit",n=>{n.preventDefault();const r=document.getElementById("name").value,a=document.getElementById("email").value,i=document.getElementById("password").value;this.presenter.handleRegister(r,a,i)})}showMessage(e,n=!0){const r=document.getElementById("message");r.innerText=n?`✅ ${e}`:`❌ ${e}`,r.style.color=n?"green":"red"}resetForm(){document.getElementById("registerForm").reset()}}class oe{constructor(){this.view=new ie(this)}async render(){return this.view.render()}async afterRender(){this.view.afterRender()}async handleRegister(e,n,r){try{const a=await X.register(e,n,r);this.view.showMessage(a.message,!0),this.view.resetForm(),document.startViewTransition?document.startViewTransition(()=>{window.location.hash="/"}):window.location.hash="/"}catch(a){this.view.showMessage(a.message||"Failed to register user",!1)}}}const p={render(){return document.querySelector("header").style.display="block",document.querySelector("footer").style.display="block",`
      <section id="main-content" class="container-homepage">
        <h1>Home Page</h1>
        <div id="storyList">Loading stories...</div>
      </section>
    `},showStories(t){const e=document.getElementById("storyList");if(!t||t.length===0){e.innerHTML="<p>No stories found.</p>";return}const n=t.map(a=>`
        <div class="story-card" data-id="${a.id}">
          <img src="${a.photoUrl}" alt="${a.name}" width="100" />
          <h2>${a.name}</h2>
          <p>${a.description}</p>
          <small>${new Date(a.createdAt).toLocaleString()}</small>
          <button class="view-detail-button" data-id="${a.id}">Lihat Detail</button>
          <button class="delete-story-button" data-id="${a.id}">Hapus</button>
        </div>
      `).join(""),r=`
      <div class="story-card add-card" id="addStoryCard">
        <div class="add-icon">+</div>
        <div>Tambah Cerita</div>
      </div>
    `;e.innerHTML=n+r},showError(t){const e=document.getElementById("storyList");e.innerHTML=`<p style="color:red;">❌ ${t}</p>`},bindDetailButtons(t){document.querySelectorAll(".view-detail-button").forEach(e=>{e.addEventListener("click",n=>{const r=n.target.getAttribute("data-id");t(r)})})},bindAddButton(t){const e=document.getElementById("addStoryCard");e&&e.addEventListener("click",()=>t())},bindDeleteButtons(t){document.querySelectorAll(".delete-story-button").forEach(e=>{e.addEventListener("click",n=>{const r=n.target.getAttribute("data-id");confirm("Yakin ingin menghapus story ini?")&&t(r)})})}},P=(t,e)=>e.some(n=>t instanceof n);let x,V;function se(){return x||(x=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ce(){return V||(V=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const M=new WeakMap,A=new WeakMap,I=new WeakMap;function de(t){const e=new Promise((n,r)=>{const a=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(g(t.result)),a()},o=()=>{r(t.error),a()};t.addEventListener("success",i),t.addEventListener("error",o)});return I.set(e,t),e}function le(t){if(M.has(t))return;const e=new Promise((n,r)=>{const a=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),a()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),a()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});M.set(t,e)}let T={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return M.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return g(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function G(t){T=t(T)}function ue(t){return ce().includes(t)?function(...e){return t.apply(R(this),e),g(this.request)}:function(...e){return g(t.apply(R(this),e))}}function me(t){return typeof t=="function"?ue(t):(t instanceof IDBTransaction&&le(t),P(t,se())?new Proxy(t,T):t)}function g(t){if(t instanceof IDBRequest)return de(t);if(A.has(t))return A.get(t);const e=me(t);return e!==t&&(A.set(t,e),I.set(e,t)),e}const R=t=>I.get(t);function ge(t,e,{blocked:n,upgrade:r,blocking:a,terminated:i}={}){const o=indexedDB.open(t,e),c=g(o);return r&&o.addEventListener("upgradeneeded",s=>{r(g(o.result),s.oldVersion,s.newVersion,g(o.transaction),s)}),n&&o.addEventListener("blocked",s=>n(s.oldVersion,s.newVersion,s)),c.then(s=>{i&&s.addEventListener("close",()=>i()),a&&s.addEventListener("versionchange",d=>a(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const pe=["get","getKey","getAll","getAllKeys","count"],he=["put","add","delete","clear"],C=new Map;function q(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(C.get(e))return C.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,a=he.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(a||pe.includes(n)))return;const i=async function(o,...c){const s=this.transaction(o,a?"readwrite":"readonly");let d=s.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[n](...c),a&&s.done]))[0]};return C.set(e,i),i}G(t=>({...t,get:(e,n,r)=>q(e,n)||t.get(e,n,r),has:(e,n)=>!!q(e,n)||t.has(e,n)}));const ye=["continue","continuePrimaryKey","advance"],j={},O=new WeakMap,z=new WeakMap,fe={get(t,e){if(!ye.includes(e))return t[e];let n=j[e];return n||(n=j[e]=function(...r){O.set(this,z.get(this)[e](...r))}),n}};async function*we(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,fe);for(z.set(n,e),I.set(n,R(e));e;)yield n,e=await(O.get(n)||e.continue()),O.delete(n)}function N(t,e){return e===Symbol.asyncIterator&&P(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&P(t,[IDBIndex,IDBObjectStore])}G(t=>({...t,get(e,n,r){return N(e,n)?we:t.get(e,n,r)},has(e,n){return N(e,n)||t.has(e,n)}}));const be="story-db",ve=1,h="stories",B=ge(be,ve,{upgrade(t){t.objectStoreNames.contains(h)||t.createObjectStore(h,{keyPath:"id"})}}),w={async getAll(){return(await B).getAll(h)},async put(t){return(await B).put(h,t)},async delete(t){return(await B).delete(h,t)},async clear(){return(await B).clear(h)}};class Le{async render(){return p.render()}async afterRender(){try{const r=(await ee()).listStory;await w.clear(),await Promise.all(r.map(a=>w.put(a)))}catch(n){console.warn("Gagal fetch API, ambil dari cache:",n.message)}const e=await w.getAll();p.showStories(e),this._bindAllButtons()}_bindAllButtons(){p.bindAddButton(()=>{window.location.hash="/add"}),p.bindDetailButtons(e=>{window.location.hash=`/detail/${e}`}),p.bindDeleteButtons(async e=>{await w.delete(e);const n=await w.getAll();p.showStories(n),this._bindAllButtons()})}}const m={render(){return`
    <section id="main-content" class="main-content">
      <h1>Add Story</h1>
      <form id="story-form">
        <article>
          <label for="description">Deskripsi</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Tulis deskripsi di sini..."
            required
          ></textarea>
        </article>

        <div class="container-camera">
          <article>
            <h2>Input Kamera</h2>
            <section class="camera">
              <video
                id="camera-video"
                class="camera-video"
                autoplay
                muted
                playsinline
              >
                Video stream not available.
              </video>
              <canvas
                id="camera-canvas"
                class="camera-canvas"
                style="display: none"
              ></canvas>
            </section>
          </article>

          <article class="camera-tools">
            <select id="camera-list-select" class="camera-select"></select>
            <section class="camera-tools-buttons">
              <button id="camera-start-button" class="camera-button" type="button" aria-label="Aktifkan Kamera">
                <img src="images/camera.png" alt="aktif-camera">
              </button>
              <button id="camera-take-button" class="camera-button" type="button" aria-label="Ambil Foto">
                <img src="images/plus.png" alt="add-gambar">
              </button>
              <button id="camera-clear-button" class="camera-button" type="button" aria-label="Hapus Foto">
                <img src="images/minus.png" alt="minus-gambar">
              </button>
              <button id="camera-stop-button" class="camera-button" type="button" aria-label="Matikan Kamera">
                <img src="images/no-camera.png" alt="nonaktif-camera">
              </button>
            </section>
          </article>

          <article>
            <h2>Output Kamera</h2>
            <ul id="camera-list-output" class="camera-output"></ul>
            <input type="hidden" id="image-base64" name="image" />
          </article>
        </div>

        <article>
          <h2>Koordinat Lokasi</h2>
          <div class="coordinates-group">
            <label for="latitude">Latitude</label>
            <input type="text" id="latitude" name="latitude" readonly />

            <label for="longitude">Longitude</label>
            <input type="text" id="longitude" name="longitude" readonly />
          </div>
        </article>

        <div id="map" style="height: 300px;"></div>

        <button type="submit" class="camera-button">Kirim Cerita</button>
      </form>
    </section>
    `},getFormData(){return{base64Image:document.getElementById("image-base64").value,description:document.getElementById("description").value,latitude:document.getElementById("latitude").value,longitude:document.getElementById("longitude").value}},setCameraElements(){return{cameraVideo:document.getElementById("camera-video"),cameraCanvas:document.getElementById("camera-canvas"),cameraListSelect:document.getElementById("camera-list-select"),cameraTakeButton:document.getElementById("camera-take-button"),cameraClearButton:document.getElementById("camera-clear-button"),cameraStopButton:document.getElementById("camera-stop-button"),cameraStartButton:document.getElementById("camera-start-button"),cameraOutputList:document.getElementById("camera-list-output"),imageBase64:document.getElementById("image-base64")}},showHeaderFooter(){document.querySelector("header").style.display="block",document.querySelector("footer").style.display="block"},setupCameraHandlers(t){const e=this.setCameraElements(),n=e.cameraVideo,r=e.cameraCanvas,a=e.cameraListSelect;let i=!1,o=320,c=0;return n.addEventListener("canplay",()=>{i||(c=n.videoHeight*o/n.videoWidth,n.setAttribute("width",o),n.setAttribute("height",c),r.setAttribute("width",o),r.setAttribute("height",c),i=!0)}),e.cameraStartButton.addEventListener("click",async()=>{await t.stopCamera();const s=await t.getStream(a.value);s&&t.launchCamera(n,s)}),e.cameraStopButton.addEventListener("click",()=>t.stopCamera()),e.cameraTakeButton.addEventListener("click",()=>{r.getContext("2d").drawImage(n,0,0,o,c);const d=r.toDataURL("image/png");e.imageBase64.value=d,e.cameraOutputList.innerHTML=`<li><img src="${d}" /></li>`}),e.cameraClearButton.addEventListener("click",()=>{e.cameraOutputList.innerHTML="",e.imageBase64.value=""}),a.addEventListener("change",async()=>{await t.stopCamera();const s=await t.getStream(a.value);s&&t.launchCamera(n,s)}),()=>t.populateCameraList(a)},setupMap(){const t=[-2.548926,118.0148634],e=L.map("map").setView(t,5);L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(e);const n=L.popup();e.on("click",r=>{const{lat:a,lng:i}=r.latlng;n.setLatLng(r.latlng).setContent(`Latitude: ${a.toFixed(5)}<br>Longitude: ${i.toFixed(5)}`).openOn(e),document.getElementById("latitude").value=a.toFixed(5),document.getElementById("longitude").value=i.toFixed(5)}),this.mapInstance=e},setupFormListener(t){document.getElementById("story-form").addEventListener("submit",t)}};class Ee{constructor(){this.currentStream=null}render(){return m.render()}async afterRender(){m.showHeaderFooter(),m.setupMap(),await m.setupCameraHandlers(this)();const n=m.setCameraElements(),r=await this.getStream(n.cameraListSelect.value);r&&this.launchCamera(n.cameraVideo,r),m.setupFormListener(this.handleSubmit.bind(this)),window.addEventListener("hashchange",()=>this.stopCamera())}async getStream(e){try{const n={video:e?{deviceId:{exact:e}}:!0},r=await navigator.mediaDevices.getUserMedia(n);return this.currentStream=r,r}catch(n){return alert("Gagal mengakses kamera: "+n.message),null}}async populateCameraList(e){const r=(await navigator.mediaDevices.enumerateDevices()).filter(a=>a.kind==="videoinput");e.innerHTML=r.map((a,i)=>`<option value="${a.deviceId}">${a.label||`Camera ${i+1}`}</option>`).join("")}launchCamera(e,n){e.srcObject=n,e.play()}stopCamera(){this.currentStream&&(this.currentStream.getTracks().forEach(n=>n.stop()),this.currentStream=null);const e=m.setCameraElements();e.cameraVideo.srcObject=null}async handleSubmit(e){e.preventDefault();const{base64Image:n,description:r,latitude:a,longitude:i}=m.getFormData();try{await ne(n,r,a,i),alert("Cerita berhasil ditambahkan!"),document.startViewTransition?document.startViewTransition(()=>{window.location.hash="#/home"}):window.location.hash="#/home"}catch(o){alert(`Gagal submit cerita: ${o.message}`)}}}const b={render(){return document.querySelector("header").style.display="block",document.querySelector("footer").style.display="block",`
      <section id="main-content" class="container-detail">
        <h1>Detail Cerita</h1>
        <div id="storyDetail">Memuat detail...</div>
        <div id="map" style="height: 300px; margin-top: 1rem;"></div>
      </section>
    `},showStoryDetail(t){const e=document.getElementById("storyDetail");e.innerHTML=`
      <img src="${t.photoUrl}" alt="${t.name}" width="200" />
      <h2>${t.name}</h2>
      <p>${t.description}</p>
      <small>Dibuat pada: ${new Date(t.createdAt).toLocaleString()}</small>
    `},showMap(t,e,n,r){const a=L.map("map").setView([t,e],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'}).addTo(a),L.marker([t,e]).addTo(a).bindPopup(`<b>${n}</b><br>${r}`).openPopup()},showNoLocation(){document.getElementById("map").innerHTML="<p>Lokasi tidak tersedia.</p>"},showError(t){const e=document.getElementById("storyDetail");e.innerHTML=`<p style="color:red;">❌ ${t}</p>`}};class Be{async render(){return b.render()}async afterRender(){const n=window.location.hash.split("/")[2];try{const a=(await te(n)).story;b.showStoryDetail(a),a.lat!==void 0&&a.lon!==void 0?b.showMap(a.lat,a.lon,a.name,a.description):b.showNoLocation()}catch(r){b.showError(r.message)}}}const H=new ae,U=new oe,_=new Le,W=new Be,K=new Ee,Se={"/":{render:()=>H.render(),afterRender:()=>H.afterRender()},"/register":{render:()=>U.render(),afterRender:()=>U.afterRender()},"/home":{render:()=>_.render(),afterRender:()=>_.afterRender()},"/add":{render:()=>K.render(),afterRender:()=>K.afterRender()},"/detail/:id":{render:()=>W.render(),afterRender:()=>W.afterRender()}};function ke(t){const e=t.split("/");return{resource:e[1]||null,id:e[2]||null}}function Ie(t){let e="";return t.resource&&(e=e.concat(`/${t.resource}`)),t.id&&(e=e.concat("/:id")),e||"/"}function De(){return location.hash.replace("#","")||"/"}function Ae(){const t=De(),e=ke(t);return Ie(e)}const Ce="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";function Pe(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/-/g,"+").replace(/_/g,"/"),r=atob(n),a=new Uint8Array(r.length);for(let i=0;i<r.length;++i)a[i]=r.charCodeAt(i);return a}async function Me(t){if(!("serviceWorker"in navigator)){console.error("Service Worker tidak didukung oleh browser ini.");return}const e=await navigator.serviceWorker.register("/my-story-app/service-worker.js");if(await Notification.requestPermission()!=="granted")throw new Error("Izin notifikasi ditolak.");const r=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Pe(Ce)}),a={endpoint:r.endpoint,keys:{p256dh:r.toJSON().keys.p256dh,auth:r.toJSON().keys.auth}};await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)})}async function Te(){if(!("serviceWorker"in navigator))return;const t=await navigator.serviceWorker.getRegistration();if(!t)return;const e=await t.pushManager.getSubscription();e&&(await e.unsubscribe(),console.log("Berhasil unsubscribe notifikasi"))}async function Re(){if(!("serviceWorker"in navigator))return!1;const t=await navigator.serviceWorker.getRegistration();return t?!!await t.pushManager.getSubscription():!1}var v,y,u,S,J;class Oe{constructor({navigationDrawer:e,drawerButton:n,content:r}){f(this,S);f(this,v,null);f(this,y,null);f(this,u,null);E(this,v,r),E(this,y,n),E(this,u,e),F(this,S,J).call(this)}async renderPage(){const e=Ae(),n=Se[e];l(this,v).innerHTML=await n.render(),await n.afterRender();const r=localStorage.getItem("token"),a=document.getElementById("subscribe-btn"),i=document.getElementById("unsubscribe-btn");a&&i&&(await Re()?(a.style.display="none",i.style.display="inline-block"):(a.style.display="inline-block",i.style.display="none"),a.addEventListener("click",async()=>{if(!r){alert("Silakan login terlebih dahulu untuk berlangganan notifikasi.");return}try{await Me(r),alert("Berhasil berlangganan notifikasi!"),a.style.display="none",i.style.display="inline-block"}catch(c){alert("Gagal berlangganan notifikasi: "+c.message)}}),i.addEventListener("click",async()=>{try{await Te(),alert("Berhasil berhenti berlangganan notifikasi."),a.style.display="inline-block",i.style.display="none"}catch(c){alert("Gagal berhenti berlangganan: "+c.message)}}))}}v=new WeakMap,y=new WeakMap,u=new WeakMap,S=new WeakSet,J=function(){l(this,y).addEventListener("click",()=>{l(this,u).classList.toggle("open")}),document.body.addEventListener("click",e=>{!l(this,u).contains(e.target)&&!l(this,y).contains(e.target)&&l(this,u).classList.remove("open"),l(this,u).querySelectorAll("a").forEach(n=>{n.contains(e.target)&&l(this,u).classList.remove("open")})})};"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(t=>{console.log("Service Worker registered:",t)}).catch(t=>{console.error("Service Worker registration failed:",t)})});document.addEventListener("DOMContentLoaded",async()=>{const t=new Oe({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});await t.renderPage(),window.addEventListener("hashchange",async()=>{await t.renderPage()})});document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".skip-to-content").addEventListener("click",function(e){e.preventDefault(),setTimeout(()=>{const n=document.getElementById("main-content");n&&(n.setAttribute("tabindex","-1"),n.focus())},100)})});
