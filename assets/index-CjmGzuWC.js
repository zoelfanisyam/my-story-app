var F=t=>{throw TypeError(t)};var A=(t,e,n)=>e.has(t)||F("Cannot "+n);var l=(t,e,n)=>(A(t,e,"read from private field"),n?n.call(t):e.get(t)),b=(t,e,n)=>e.has(t)?F("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),E=(t,e,n,a)=>(A(t,e,"write to private field"),a?a.call(t,n):e.set(t,n),n),x=(t,e,n)=>(A(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const X={BASE_URL:"https://story-api.dicoding.dev/v1"},D={BASE_URL:X.BASE_URL};function Z(){return localStorage.getItem("token")}const ee={async register(t,e,n){const a=await fetch(D.BASE_URL+"/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,password:n})}),r=await a.json();if(!a.ok)throw new Error(r.message||"Failed to register");return r}},te={async login(t,e){const n=await fetch(D.BASE_URL+"/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),a=await n.json();if(!n.ok)throw new Error(a.message||"Login failed");return a}};async function ne(t=1,e=7,n=0,a=localStorage.getItem("token")){const r=new URLSearchParams;t!==void 0&&r.append("page",t),e!==void 0&&r.append("size",e),n!==void 0&&r.append("location",n);const i=await fetch(`${D.BASE_URL}/stories?${r.toString()}`,{method:"GET",headers:{Authorization:"Bearer "+a}}),o=await i.json();if(!i.ok)throw new Error(o.message||"Failed to fetch stories");return o}async function ae(t,e=localStorage.getItem("token")){const n=await fetch(`${D.BASE_URL}/stories/${t}`,{method:"GET",headers:{Authorization:`Bearer ${e}`}}),a=await n.json();if(!n.ok)throw new Error(a.message||"Failed to fetch story detail");return a}async function re(t,e,n,a){const r=Z(),i=await(await fetch(t)).blob(),o=new File([i],"photo.jpg",{type:i.type}),c=new FormData;c.append("photo",o),c.append("description",e),n&&c.append("lat",parseFloat(n)),a&&c.append("lon",parseFloat(a));const s=await fetch("https://story-api.dicoding.dev/v1/stories",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:c}),d=await s.json();if(!s.ok)throw new Error(d.message);return d}class ie{constructor(e){this.presenter=e}render(){return`
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
    `}afterRender(){document.querySelector("header").style.display="none",document.querySelector("footer").style.display="none";const e=document.getElementById("loginForm");e.addEventListener("submit",n=>{n.preventDefault();const a=e.email.value,r=e.password.value;this.presenter.handleLogin(a,r)})}showMessage(e,n){const a=document.getElementById("loginMessage");a.innerText=e,a.style.color=n?"green":"red"}}class oe{constructor(){this.view=new ie(this)}async render(){return this.view.render()}async afterRender(){this.view.afterRender()}async handleLogin(e,n){try{const a=await te.login(e,n);localStorage.setItem("token",a.loginResult.token),this.view.showMessage(`✅ ${a.message}`,!0),document.startViewTransition?document.startViewTransition(()=>{window.location.hash="/home"}):window.location.hash="/home"}catch(a){this.view.showMessage(`❌ ${a.message}`,!1)}}}class se{constructor(e){this.presenter=e}render(){return`
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
    `}afterRender(){document.querySelector("header").style.display="none",document.querySelector("footer").style.display="none",document.getElementById("registerForm").addEventListener("submit",n=>{n.preventDefault();const a=document.getElementById("name").value,r=document.getElementById("email").value,i=document.getElementById("password").value;this.presenter.handleRegister(a,r,i)})}showMessage(e,n=!0){const a=document.getElementById("message");a.innerText=n?`✅ ${e}`:`❌ ${e}`,a.style.color=n?"green":"red"}resetForm(){document.getElementById("registerForm").reset()}}class ce{constructor(){this.view=new se(this)}async render(){return this.view.render()}async afterRender(){this.view.afterRender()}async handleRegister(e,n,a){try{const r=await ee.register(e,n,a);this.view.showMessage(r.message,!0),this.view.resetForm(),document.startViewTransition?document.startViewTransition(()=>{window.location.hash="/"}):window.location.hash="/"}catch(r){this.view.showMessage(r.message||"Failed to register user",!1)}}}const h={render(){return`
      <section id="main-content" class="container-homepage">
        <h1>Semua Cerita</h1>
        <div id="storyList">Loading...</div>
      </section>
    `},showStories(t,e=new Set){const n=document.getElementById("storyList");if(!t||t.length===0){n.innerHTML="<p>Tidak ada story ditemukan.</p>";return}const a=t.map(i=>{const o=e.has(i.id);return`
          <div class="story-card" data-id="${i.id}">
            <img src="${i.photoUrl}" alt="${i.name}" width="100" />
            <h2>${i.name}</h2>
            <p>${i.description}</p>
            <small>${new Date(i.createdAt).toLocaleString()}</small>
            <button class="view-detail-button" data-id="${i.id}">Lihat Detail</button>
            ${o?'<span class="saved-indicator">✅ Tersimpan</span>':`<button class="save-story-button" data-id="${i.id}">Simpan</button>`}
          </div>
        `}).join(""),r=`
      <div class="story-card add-card" id="addStoryCard">
        <div class="add-icon">+</div>
        <div>Tambah Cerita</div>
      </div>
    `;n.innerHTML=a+r},bindDetailButtons(t){document.querySelectorAll(".view-detail-button").forEach(e=>{e.addEventListener("click",n=>{const a=n.target.getAttribute("data-id");t(a)})})},bindAddButton(t){const e=document.getElementById("addStoryCard");e&&e.addEventListener("click",()=>t())},bindSaveButtons(t){document.querySelectorAll(".save-story-button").forEach(e=>{e.addEventListener("click",n=>{const a=n.target.getAttribute("data-id");t(a)})})},showError(t){const e=document.getElementById("storyList");e.innerHTML=`<p style="color:red;">❌ ${t}</p>`},bindDetailButtons(t){document.querySelectorAll(".view-detail-button").forEach(e=>{e.addEventListener("click",n=>{const a=n.target.getAttribute("data-id");t(a)})})},bindAddButton(t){const e=document.getElementById("addStoryCard");e&&e.addEventListener("click",()=>t())}},T=(t,e)=>e.some(n=>t instanceof n);let V,q;function de(){return V||(V=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function le(){return q||(q=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const P=new WeakMap,C=new WeakMap,I=new WeakMap;function ue(t){const e=new Promise((n,a)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(p(t.result)),r()},o=()=>{a(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return I.set(e,t),e}function me(t){if(P.has(t))return;const e=new Promise((n,a)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{a(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});P.set(t,e)}let $={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return P.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function J(t){$=t($)}function ge(t){return le().includes(t)?function(...e){return t.apply(R(this),e),p(this.request)}:function(...e){return p(t.apply(R(this),e))}}function he(t){return typeof t=="function"?ge(t):(t instanceof IDBTransaction&&me(t),T(t,de())?new Proxy(t,$):t)}function p(t){if(t instanceof IDBRequest)return ue(t);if(C.has(t))return C.get(t);const e=he(t);return e!==t&&(C.set(t,e),I.set(e,t)),e}const R=t=>I.get(t);function pe(t,e,{blocked:n,upgrade:a,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),c=p(o);return a&&o.addEventListener("upgradeneeded",s=>{a(p(o.result),s.oldVersion,s.newVersion,p(o.transaction),s)}),n&&o.addEventListener("blocked",s=>n(s.oldVersion,s.newVersion,s)),c.then(s=>{i&&s.addEventListener("close",()=>i()),r&&s.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const ye=["get","getKey","getAll","getAllKeys","count"],fe=["put","add","delete","clear"],M=new Map;function _(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(M.get(e))return M.get(e);const n=e.replace(/FromIndex$/,""),a=e!==n,r=fe.includes(n);if(!(n in(a?IDBIndex:IDBObjectStore).prototype)||!(r||ye.includes(n)))return;const i=async function(o,...c){const s=this.transaction(o,r?"readwrite":"readonly");let d=s.store;return a&&(d=d.index(c.shift())),(await Promise.all([d[n](...c),r&&s.done]))[0]};return M.set(e,i),i}J(t=>({...t,get:(e,n,a)=>_(e,n)||t.get(e,n,a),has:(e,n)=>!!_(e,n)||t.has(e,n)}));const be=["continue","continuePrimaryKey","advance"],j={},O=new WeakMap,Y=new WeakMap,we={get(t,e){if(!be.includes(e))return t[e];let n=j[e];return n||(n=j[e]=function(...a){O.set(this,Y.get(this)[e](...a))}),n}};async function*ve(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,we);for(Y.set(n,e),I.set(n,R(e));e;)yield n,e=await(O.get(n)||e.continue()),O.delete(n)}function H(t,e){return e===Symbol.asyncIterator&&T(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&T(t,[IDBIndex,IDBObjectStore])}J(t=>({...t,get(e,n,a){return H(e,n)?ve:t.get(e,n,a)},has(e,n){return H(e,n)||t.has(e,n)}}));const Se="story-db",Le=1,y="stories",B=pe(Se,Le,{upgrade(t){t.objectStoreNames.contains(y)||t.createObjectStore(y,{keyPath:"id"})}}),m={async getAll(){return(await B).getAll(y)},async put(t){return(await B).put(y,t)},async delete(t){return(await B).delete(y,t)},async clear(){return(await B).clear(y)}};class Ee{async render(){return h.render()}async afterRender(){try{const n=(await ne()).listStory,a=await m.getAll(),r=new Set(a.map(i=>i.id));h.showStories(n,r),this._bindAllButtons(),this._bindSaveButtons(n)}catch(e){console.error("Gagal mengambil data:",e.message),h.showError("Gagal mengambil data dari server.")}}_bindAllButtons(){h.bindAddButton(()=>{window.location.hash="/add"}),h.bindDetailButtons(e=>{window.location.hash=`/detail/${e}`})}_bindSaveButtons(e){h.bindSaveButtons(async n=>{const a=e.find(o=>o.id===n);if(!a)return;await m.put(a);const r=await m.getAll(),i=new Set(r.map(o=>o.id));h.showStories(e,i),this._bindSaveButtons(e)})}}const g={render(){return`
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
    `},getFormData(){return{base64Image:document.getElementById("image-base64").value,description:document.getElementById("description").value,latitude:document.getElementById("latitude").value,longitude:document.getElementById("longitude").value}},setCameraElements(){return{cameraVideo:document.getElementById("camera-video"),cameraCanvas:document.getElementById("camera-canvas"),cameraListSelect:document.getElementById("camera-list-select"),cameraTakeButton:document.getElementById("camera-take-button"),cameraClearButton:document.getElementById("camera-clear-button"),cameraStopButton:document.getElementById("camera-stop-button"),cameraStartButton:document.getElementById("camera-start-button"),cameraOutputList:document.getElementById("camera-list-output"),imageBase64:document.getElementById("image-base64")}},showHeaderFooter(){document.querySelector("header").style.display="block",document.querySelector("footer").style.display="block"},setupCameraHandlers(t){const e=this.setCameraElements(),n=e.cameraVideo,a=e.cameraCanvas,r=e.cameraListSelect;let i=!1,o=320,c=0;return n.addEventListener("canplay",()=>{i||(c=n.videoHeight*o/n.videoWidth,n.setAttribute("width",o),n.setAttribute("height",c),a.setAttribute("width",o),a.setAttribute("height",c),i=!0)}),e.cameraStartButton.addEventListener("click",async()=>{await t.stopCamera();const s=await t.getStream(r.value);s&&t.launchCamera(n,s)}),e.cameraStopButton.addEventListener("click",()=>t.stopCamera()),e.cameraTakeButton.addEventListener("click",()=>{a.getContext("2d").drawImage(n,0,0,o,c);const d=a.toDataURL("image/png");e.imageBase64.value=d,e.cameraOutputList.innerHTML=`<li><img src="${d}" /></li>`}),e.cameraClearButton.addEventListener("click",()=>{e.cameraOutputList.innerHTML="",e.imageBase64.value=""}),r.addEventListener("change",async()=>{await t.stopCamera();const s=await t.getStream(r.value);s&&t.launchCamera(n,s)}),()=>t.populateCameraList(r)},setupMap(){const t=[-2.548926,118.0148634],e=L.map("map").setView(t,5);L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(e);const n=L.popup();e.on("click",a=>{const{lat:r,lng:i}=a.latlng;n.setLatLng(a.latlng).setContent(`Latitude: ${r.toFixed(5)}<br>Longitude: ${i.toFixed(5)}`).openOn(e),document.getElementById("latitude").value=r.toFixed(5),document.getElementById("longitude").value=i.toFixed(5)}),this.mapInstance=e},setupFormListener(t){document.getElementById("story-form").addEventListener("submit",t)}};class Be{constructor(){this.currentStream=null}render(){return g.render()}async afterRender(){g.showHeaderFooter(),g.setupMap(),await g.setupCameraHandlers(this)();const n=g.setCameraElements(),a=await this.getStream(n.cameraListSelect.value);a&&this.launchCamera(n.cameraVideo,a),g.setupFormListener(this.handleSubmit.bind(this)),window.addEventListener("hashchange",()=>this.stopCamera())}async getStream(e){try{const n={video:e?{deviceId:{exact:e}}:!0},a=await navigator.mediaDevices.getUserMedia(n);return this.currentStream=a,a}catch(n){return alert("Gagal mengakses kamera: "+n.message),null}}async populateCameraList(e){const a=(await navigator.mediaDevices.enumerateDevices()).filter(r=>r.kind==="videoinput");e.innerHTML=a.map((r,i)=>`<option value="${r.deviceId}">${r.label||`Camera ${i+1}`}</option>`).join("")}launchCamera(e,n){e.srcObject=n,e.play()}stopCamera(){this.currentStream&&(this.currentStream.getTracks().forEach(n=>n.stop()),this.currentStream=null);const e=g.setCameraElements();e.cameraVideo.srcObject=null}async handleSubmit(e){e.preventDefault();const{base64Image:n,description:a,latitude:r,longitude:i}=g.getFormData();try{await re(n,a,r,i),alert("Cerita berhasil ditambahkan!"),document.startViewTransition?document.startViewTransition(()=>{window.location.hash="#/home"}):window.location.hash="#/home"}catch(o){alert(`Gagal submit cerita: ${o.message}`)}}}const w={render(){return document.querySelector("header").style.display="block",document.querySelector("footer").style.display="block",`
      <section id="main-content" class="container-detail">
        <h1>Detail Cerita</h1>
        <div id="storyDetail">Memuat detail...</div>
        <div id="map" style="height: 300px; margin-top: 1rem;"></div>
      </section>
    `},async showStoryDetail(t){const e=document.getElementById("storyDetail"),n=await this._isStorySaved(t.id);e.innerHTML=`
      <img src="${t.photoUrl}" alt="${t.name}" width="200" />
      <h2>${t.name}</h2>
      <p>${t.description}</p>
      <small>Dibuat pada: ${new Date(t.createdAt).toLocaleString()}</small>
      <div style="margin-top:1rem;">
        <button id="saveStoryBtn">${n?"Hapus Story":"Simpan Story"}</button>
      </div>
    `,document.getElementById("saveStoryBtn").addEventListener("click",async()=>{n?(await m.delete(t.id),alert("Story berhasil dihapus dari penyimpanan.")):(await m.put(t),alert("Story berhasil disimpan!")),this.showStoryDetail(t)})},async _isStorySaved(t){return(await m.getAll()).some(n=>n.id===t)},showMap(t,e,n,a){const r=L.map("map").setView([t,e],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'}).addTo(r),L.marker([t,e]).addTo(r).bindPopup(`<b>${n}</b><br>${a}`).openPopup()},showNoLocation(){document.getElementById("map").innerHTML="<p>Lokasi tidak tersedia.</p>"},showError(t){const e=document.getElementById("storyDetail");e.innerHTML=`<p style="color:red;">❌ ${t}</p>`}};class ke{async render(){return w.render()}async afterRender(){const n=window.location.hash.split("/")[2];try{const r=(await ae(n)).story;w.showStoryDetail(r),r.lat!==void 0&&r.lon!==void 0?w.showMap(r.lat,r.lon,r.name,r.description):w.showNoLocation()}catch(a){w.showError(a.message)}}}const v={render(){return document.querySelector("header").style.display="block",document.querySelector("footer").style.display="block",`
      <section id="main-content" class="container-homepage">
        <h1>Catatan Tersimpan</h1>
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
      `).join("");e.innerHTML=n},showError(t){const e=document.getElementById("storyList");e.innerHTML=`<p style="color:red;">❌ ${t}</p>`},bindDetailButtons(t){document.querySelectorAll(".view-detail-button").forEach(e=>{e.addEventListener("click",n=>{const a=n.target.getAttribute("data-id");t(a)})})},bindDeleteButtons(t){document.querySelectorAll(".delete-story-button").forEach(e=>{e.addEventListener("click",n=>{const a=n.target.getAttribute("data-id");confirm("Yakin ingin menghapus story ini?")&&t(a)})})}};class De{async render(){return v.render()}async afterRender(){const e=await m.getAll();v.showStories(e),this._bindAllButtons()}_bindAllButtons(){v.bindDetailButtons(e=>{window.location.hash=`/detail/${e}`}),v.bindDeleteButtons(async e=>{await m.delete(e);const n=await m.getAll();v.showStories(n),this._bindAllButtons()})}}const N=new oe,U=new ce,W=new Ee,K=new ke,G=new Be,z=new De,Ie={"/":{render:()=>N.render(),afterRender:()=>N.afterRender()},"/register":{render:()=>U.render(),afterRender:()=>U.afterRender()},"/home":{render:()=>W.render(),afterRender:()=>W.afterRender()},"/add":{render:()=>G.render(),afterRender:()=>G.afterRender()},"/detail/:id":{render:()=>K.render(),afterRender:()=>K.afterRender()},"/saved":{render:()=>z.render(),afterRender:()=>z.afterRender()}};function Ae(t){const e=t.split("/");return{resource:e[1]||null,id:e[2]||null}}function Ce(t){let e="";return t.resource&&(e=e.concat(`/${t.resource}`)),t.id&&(e=e.concat("/:id")),e||"/"}function Me(){return location.hash.replace("#","")||"/"}function Te(){const t=Me(),e=Ae(t);return Ce(e)}const Pe="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";function $e(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/-/g,"+").replace(/_/g,"/"),a=atob(n),r=new Uint8Array(a.length);for(let i=0;i<a.length;++i)r[i]=a.charCodeAt(i);return r}async function Re(t){if(!("serviceWorker"in navigator)){console.error("Service Worker tidak didukung oleh browser ini.");return}const e=await navigator.serviceWorker.register("/my-story-app/service-worker.js");if(await Notification.requestPermission()!=="granted")throw new Error("Izin notifikasi ditolak.");const a=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:$e(Pe)}),r={endpoint:a.endpoint,keys:{p256dh:a.toJSON().keys.p256dh,auth:a.toJSON().keys.auth}};await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(r)})}async function Oe(){if(!("serviceWorker"in navigator))return;const t=await navigator.serviceWorker.getRegistration();if(!t)return;const e=await t.pushManager.getSubscription();e&&(await e.unsubscribe(),console.log("Berhasil unsubscribe notifikasi"))}async function Fe(){if(!("serviceWorker"in navigator))return!1;const t=await navigator.serviceWorker.getRegistration();return t?!!await t.pushManager.getSubscription():!1}var S,f,u,k,Q;class xe{constructor({navigationDrawer:e,drawerButton:n,content:a}){b(this,k);b(this,S,null);b(this,f,null);b(this,u,null);E(this,S,a),E(this,f,n),E(this,u,e),x(this,k,Q).call(this)}async renderPage(){const e=Te(),n=Ie[e];l(this,S).innerHTML=await n.render(),await n.afterRender();const a=localStorage.getItem("token"),r=document.getElementById("subscribe-btn"),i=document.getElementById("unsubscribe-btn");r&&i&&(await Fe()?(r.style.display="none",i.style.display="inline-block"):(r.style.display="inline-block",i.style.display="none"),r.addEventListener("click",async()=>{if(!a){alert("Silakan login terlebih dahulu untuk berlangganan notifikasi.");return}try{await Re(a),alert("Berhasil berlangganan notifikasi!"),r.style.display="none",i.style.display="inline-block"}catch(c){alert("Gagal berlangganan notifikasi: "+c.message)}}),i.addEventListener("click",async()=>{try{await Oe(),alert("Berhasil berhenti berlangganan notifikasi."),r.style.display="inline-block",i.style.display="none"}catch(c){alert("Gagal berhenti berlangganan: "+c.message)}}))}}S=new WeakMap,f=new WeakMap,u=new WeakMap,k=new WeakSet,Q=function(){l(this,f).addEventListener("click",()=>{l(this,u).classList.toggle("open")}),document.body.addEventListener("click",e=>{!l(this,u).contains(e.target)&&!l(this,f).contains(e.target)&&l(this,u).classList.remove("open"),l(this,u).querySelectorAll("a").forEach(n=>{n.contains(e.target)&&l(this,u).classList.remove("open")})})};"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(t=>{console.log("Service Worker registered:",t)}).catch(t=>{console.error("Service Worker registration failed:",t)})});document.addEventListener("DOMContentLoaded",async()=>{const t=new xe({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});await t.renderPage(),window.addEventListener("hashchange",async()=>{await t.renderPage()})});document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".skip-to-content").addEventListener("click",function(e){e.preventDefault(),setTimeout(()=>{const n=document.getElementById("main-content");n&&(n.setAttribute("tabindex","-1"),n.focus())},100)})});
