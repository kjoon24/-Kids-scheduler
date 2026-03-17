(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:1,name:`서연`,emoji:`👧`,color:`#6C5CE7`,colorLight:`rgba(108, 92, 231, 0.15)`,colorGlow:`rgba(108, 92, 231, 0.4)`,schedules:[{id:`s1-1`,type:`school`,name:`한빛초등학교`,icon:`🏫`,departureTime:`08:10`,arrivalTime:`08:30`,pickupTime:`13:40`,returnTime:`14:00`,days:[1,2,3,4,5],tasks:[`알림장 확인하기`,`숙제 챙기기`],supplies:[`교과서`,`필기도구`,`물통`],suppliesByDay:{2:[`체육복`],4:[`체육복`,`미술 준비물`]}},{id:`s1-2`,type:`academy`,name:`피아노 학원`,icon:`🎹`,departureTime:`15:00`,arrivalTime:`15:15`,pickupTime:`16:15`,returnTime:`16:30`,days:[1,3,5],tasks:[`피아노 연습곡 복습`],supplies:[`피아노 교재`,`연습 노트`],suppliesByDay:{}},{id:`s1-3`,type:`academy`,name:`영어 학원`,icon:`📚`,departureTime:`15:00`,arrivalTime:`15:20`,pickupTime:`16:30`,returnTime:`16:50`,days:[2,4],tasks:[`영어 단어 암기`,`워크북 풀기`],supplies:[`영어 교재`,`단어장`],suppliesByDay:{}}]},{id:2,name:`민준`,emoji:`👦`,color:`#00B894`,colorLight:`rgba(0, 184, 148, 0.15)`,colorGlow:`rgba(0, 184, 148, 0.4)`,schedules:[{id:`s2-1`,type:`school`,name:`한빛초등학교`,icon:`🏫`,departureTime:`08:10`,arrivalTime:`08:30`,pickupTime:`14:30`,returnTime:`14:50`,days:[1,2,3,4,5],tasks:[`알림장 확인하기`],supplies:[`교과서`,`필기도구`,`물통`],suppliesByDay:{1:[`리코더`],3:[`리코더`],5:[`체육복`]}},{id:`s2-2`,type:`academy`,name:`수학 학원`,icon:`🔢`,departureTime:`15:30`,arrivalTime:`15:45`,pickupTime:`17:00`,returnTime:`17:15`,days:[1,3,5],tasks:[`수학 숙제 확인`],supplies:[`수학 교재`,`노트`,`연습장`],suppliesByDay:{}},{id:`s2-3`,type:`academy`,name:`태권도`,icon:`🥋`,departureTime:`15:30`,arrivalTime:`15:45`,pickupTime:`16:45`,returnTime:`17:00`,days:[2,4],tasks:[`도복 세탁 확인`],supplies:[`도복`,`물통`,`수건`],suppliesByDay:{}}]},{id:3,name:`하은`,emoji:`👶`,color:`#E17055`,colorLight:`rgba(225, 112, 85, 0.15)`,colorGlow:`rgba(225, 112, 85, 0.4)`,schedules:[{id:`s3-1`,type:`school`,name:`무지개 유치원`,icon:`🌈`,departureTime:`09:00`,arrivalTime:`09:15`,pickupTime:`14:00`,returnTime:`14:15`,days:[1,2,3,4,5],tasks:[`가방 챙기기`,`알림장 확인`],supplies:[`가방`,`물통`,`낮잠이불(월)`],suppliesByDay:{1:[`낮잠이불`],5:[`낮잠이불 가져오기`]}},{id:`s3-2`,type:`academy`,name:`미술 학원`,icon:`🎨`,departureTime:`15:00`,arrivalTime:`15:10`,pickupTime:`16:00`,returnTime:`16:10`,days:[2,4],tasks:[`미술 작품 가져오기`],supplies:[`앞치마`,`미술 가방`],suppliesByDay:{}},{id:`s3-3`,type:`academy`,name:`발레 교실`,icon:`🩰`,departureTime:`15:00`,arrivalTime:`15:10`,pickupTime:`15:50`,returnTime:`16:00`,days:[1,3],tasks:[],supplies:[`발레복`,`발레슈즈`],suppliesByDay:{}}]}],t=`kids-schedule-data`;function n(){try{let e=localStorage.getItem(t);if(e)return JSON.parse(e)}catch(e){console.warn(`데이터 로드 실패, 기본값 사용:`,e)}return r(e),[...e]}function r(e){try{return localStorage.setItem(t,JSON.stringify(e)),!0}catch(e){return console.error(`데이터 저장 실패:`,e),!1}}function i(e){let t=n(),i=t.length>0?Math.max(...t.map(e=>e.id))+1:1,a=[{color:`#6C5CE7`,colorLight:`rgba(108, 92, 231, 0.15)`,colorGlow:`rgba(108, 92, 231, 0.4)`},{color:`#00B894`,colorLight:`rgba(0, 184, 148, 0.15)`,colorGlow:`rgba(0, 184, 148, 0.4)`},{color:`#E17055`,colorLight:`rgba(225, 112, 85, 0.15)`,colorGlow:`rgba(225, 112, 85, 0.4)`},{color:`#0984E3`,colorLight:`rgba(9, 132, 227, 0.15)`,colorGlow:`rgba(9, 132, 227, 0.4)`},{color:`#FDCB6E`,colorLight:`rgba(253, 203, 110, 0.15)`,colorGlow:`rgba(253, 203, 110, 0.4)`}],o=a[(i-1)%a.length],s={id:i,name:e.name,emoji:e.emoji||`👧`,...o,schedules:[]};return t.push(s),r(t),s}function a(e,t){let i=n(),a=i.findIndex(t=>t.id===e);return a===-1?null:(i[a]={...i[a],...t},r(i),i[a])}function o(e){let t=n().filter(t=>t.id!==e);return r(t),t}function s(e,t){let i=n(),a=i.find(t=>t.id===e);if(!a)return null;let o={id:`s${e}-${Date.now()}`,type:t.type||`academy`,name:t.name,icon:t.icon||`📚`,departureTime:t.departureTime,arrivalTime:t.arrivalTime,pickupTime:t.pickupTime,returnTime:t.returnTime,days:t.days||[],tasks:t.tasks||[],supplies:t.supplies||[],suppliesByDay:t.suppliesByDay||{}};return a.schedules.push(o),r(i),o}function c(e,t,i){let a=n(),o=a.find(t=>t.id===e);if(!o)return null;let s=o.schedules.findIndex(e=>e.id===t);return s===-1?null:(o.schedules[s]={...o.schedules[s],...i},r(a),o.schedules[s])}function l(e,t){let i=n(),a=i.find(t=>t.id===e);return a?(a.schedules=a.schedules.filter(e=>e.id!==t),r(i),a):null}function u(){return r(e),[...e]}var d=`kids-schedule-presets`,f=`kids-schedule-active-preset`;function p(){try{let e=localStorage.getItem(d);if(e)return JSON.parse(e)}catch(e){console.warn(`프리셋 로드 실패:`,e)}return{}}function m(e){localStorage.setItem(d,JSON.stringify(e))}function h(){return localStorage.getItem(f)||``}function g(e){localStorage.setItem(f,e)}function _(e){let t=p(),r=n();return t[e]=JSON.parse(JSON.stringify(r)),m(t),g(e),t}function v(e){let t=p();if(!t[e])return null;let n=JSON.parse(JSON.stringify(t[e]));return r(n),g(e),n}function ee(e){let t=p();return delete t[e],m(t),h()===e&&g(``),t}function y(e){let[t,n]=e.split(`:`).map(Number),r=new Date;return new Date(r.getFullYear(),r.getMonth(),r.getDate(),t,n,0)}function b(e,t,n=new Date){let r=y(e),i=y(t)-r,a=n-r;return i<=0?0:Math.min(100,Math.max(0,a/i*100))}function x(e,t=new Date){let n=y(e)-t;if(n<=0)return`지남`;let r=Math.floor(n/(1e3*60*60)),i=Math.floor(n%(1e3*60*60)/(1e3*60));return r>0?`${r}시간 ${i}분 남음`:`${i}분 남음`}function S(e=new Date){return e.toLocaleTimeString(`ko-KR`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1})}function C(e=new Date){return`${e.getFullYear()}년 ${e.getMonth()+1}월 ${e.getDate()}일 (${[`일`,`월`,`화`,`수`,`목`,`금`,`토`][e.getDay()]})`}function w(e,t=new Date){let n=y(e.departureTime),r=y(e.arrivalTime),i=y(e.pickupTime);return t>=y(e.returnTime)?`completed`:t>=i?`returning`:t>=r?`in-class`:t>=n?`departing`:t>=new Date(n.getTime()-1800*1e3)?`upcoming`:`inactive`}function te(e){return{completed:`완료`,departing:`이동 중`,"in-class":`수업 중`,returning:`귀가 중`,upcoming:`곧 출발`,inactive:`예정`}[e]||e}function ne(e){return{completed:`status-completed`,departing:`status-active`,"in-class":`status-active`,returning:`status-active`,upcoming:`status-upcoming`,inactive:`status-inactive`}[e]||``}function T(e){return`
    <header class="dashboard-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="header-title">
            <span class="header-icon">📋</span>
            우리 아이 스케줄
          </h1>
          <p class="header-subtitle">오늘의 등하원 일정을 한눈에</p>
        </div>
        <div class="header-right" style="display: flex; align-items: center; gap: 16px;">
          <div>
            <div class="header-date">${C(e)}</div>
            <div class="header-time" id="header-time">${S(e)}</div>
          </div>
          <button class="btn btn-ghost" id="btn-toggle-theme" title="테마 변경" style="font-size: 1.5rem; padding: 8px;">
            ${document.documentElement.classList.contains(`light-theme`)?`🌙`:`☀️`}
          </button>
        </div>
      </div>
    </header>
  `}function E(e){let t=document.getElementById(`header-time`);t&&(t.textContent=S(e))}function D(){let e=document.getElementById(`btn-toggle-theme`);e&&(e.addEventListener(`click`,()=>{Q()}),document.addEventListener(`theme-changed`,t=>{e.textContent=t.detail.isLight?`🌙`:`☀️`}))}function O(e,t=new Date){let n=t.getDay();return e.schedules.filter(e=>e.days.includes(n))}function k(e){return[...e].sort((e,t)=>y(e.departureTime)-y(t.departureTime))}function A(e,t=new Date){let n=t.getDay(),r=[...e.supplies],i=e.suppliesByDay?.[n]||[];return[...r,...i]}function re(e,t=new Date){let n=k(O(e,t)),r=[],i=[],a=[];for(let e of n){let n=w(e,t);n===`completed`?r.push({...e,status:n}):[`departing`,`in-class`,`returning`].includes(n)?i.push({...e,status:n}):a.push({...e,status:n})}return{previous:r,current:i,upcoming:a,all:n}}function ie(e){if(e.length===0)return{start:`08:00`,end:`18:00`};let t=y(e[0].departureTime),n=y(e[0].returnTime);for(let r of e){let e=y(r.departureTime),i=y(r.returnTime);e<t&&(t=e),i>n&&(n=i)}t=new Date(t.getTime()-1800*1e3),n=new Date(n.getTime()+1800*1e3);let r=e=>String(e.getHours()).padStart(2,`0`),i=e=>String(e.getMinutes()).padStart(2,`0`);return{start:`${r(t)}:${i(t)}`,end:`${r(n)}:${i(n)}`}}function j(e,t,n){let r=w(e,n),i=te(r),a=ne(r),o=A(e,n),s=[`departing`,`in-class`,`returning`].includes(r),c=r===`completed`,l=``,u=``;if(r===`departing`){let r=b(e.departureTime,e.arrivalTime,n),i=x(e.arrivalTime,n);l=`
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${r}%; background: ${t}"></div>
      </div>
    `,u=`<span class="time-remaining">${i}</span>`}else if(r===`in-class`){let r=b(e.arrivalTime,e.pickupTime,n),i=x(e.pickupTime,n);l=`
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${r}%; background: ${t}"></div>
      </div>
    `,u=`<span class="time-remaining">${i}</span>`}else if(r===`returning`){let r=b(e.pickupTime,e.returnTime,n),i=x(e.returnTime,n);l=`
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${r}%; background: ${t}"></div>
      </div>
    `,u=`<span class="time-remaining">${i}</span>`}else r===`upcoming`&&(u=`<span class="time-remaining upcoming-remaining">${x(e.departureTime,n)}</span>`);let d=o.length>0?`
    <div class="schedule-supplies">
      <span class="supplies-label">🎒 준비물</span>
      <div class="supplies-list">
        ${o.map(e=>`<span class="supply-tag">${e}</span>`).join(``)}
      </div>
    </div>
  `:``,f=e.tasks.length>0?`
    <div class="schedule-tasks">
      <span class="tasks-label">✅ 할 일</span>
      <div class="tasks-list">
        ${e.tasks.map(e=>`<span class="task-item">${e}</span>`).join(``)}
      </div>
    </div>
  `:``;return`
    <div class="schedule-item ${a} ${s?`active-glow`:``}" 
         style="${s?`--child-color: ${t}`:``}"
         data-schedule-id="${e.id}">
      <div class="schedule-header">
        <div class="schedule-name">
          <span class="schedule-icon">${e.icon}</span>
          <span>${e.name}</span>
        </div>
        <div class="schedule-status-badge ${a}">
          ${s?`<span class="pulse-dot"></span>`:``}
          ${i}
          ${u}
        </div>
      </div>
      
      <div class="schedule-times">
        <div class="time-block">
          <span class="time-label">등원</span>
          <span class="time-value">${e.departureTime}</span>
          <span class="time-arrow">→</span>
          <span class="time-value">${e.arrivalTime}</span>
        </div>
        <div class="time-block">
          <span class="time-label">하원</span>
          <span class="time-value">${e.pickupTime}</span>
          <span class="time-arrow">→</span>
          <span class="time-value">${e.returnTime}</span>
        </div>
      </div>

      ${l}

      <div class="schedule-details ${c?`details-dimmed`:``}">
        ${d}
        ${f}
      </div>
    </div>
  `}function M(e,t,n){if(e.length===0)return`<div class="timeline-empty">오늘 일정이 없습니다 😊</div>`;let r=ie(e),i=y(r.start),a=y(r.end),o=a-i,s=Math.min(100,Math.max(0,(n-i)/o*100)),c=e.map(e=>{let r=(y(e.departureTime)-i)/o*100,a=(y(e.returnTime)-i)/o*100-r,s=w(e,n);return`
      <div class="timeline-block ${[`departing`,`in-class`,`returning`].includes(s)?`timeline-active`:``} ${s===`completed`?`timeline-completed`:``}"
           style="left: ${r}%; width: ${a}%; --block-color: ${t}"
           title="${e.name}: ${e.departureTime} ~ ${e.returnTime}">
        <span class="timeline-block-label">${e.icon}</span>
      </div>
    `}).join(``),l=i.getHours(),u=a.getHours()+1,d=``;for(let e=l;e<=u;e++){let t=(y(`${String(e).padStart(2,`0`)}:00`)-i)/o*100;t>=0&&t<=100&&(d+=`<span class="timeline-marker" style="left: ${t}%">${e}시</span>`)}return`
    <div class="timeline-container">
      <div class="timeline-track">
        ${c}
        <div class="timeline-now" style="left: ${s}%">
          <div class="timeline-now-dot"></div>
          <div class="timeline-now-line"></div>
        </div>
      </div>
      <div class="timeline-markers">
        ${d}
      </div>
    </div>
  `}function N(e,t){let n=k(O(e,t)),{previous:r,current:i,upcoming:a}=re(e,t),o=n.length>0,s=r.length>0?`
    <div class="schedule-section section-previous">
      <div class="section-label">
        <span class="section-dot completed"></span>
        이전 일정
      </div>
      ${r.slice(-1).map(n=>j(n,e.color,t)).join(``)}
    </div>
  `:``,c=i.length>0?`
    <div class="schedule-section section-current">
      <div class="section-label">
        <span class="section-dot active"></span>
        현재 진행 중
      </div>
      ${i.map(n=>j(n,e.color,t)).join(``)}
    </div>
  `:``,l=a.length>0?`
    <div class="schedule-section section-upcoming">
      <div class="section-label">
        <span class="section-dot upcoming"></span>
        다음 일정
      </div>
      ${a.slice(0,2).map(n=>j(n,e.color,t)).join(``)}
    </div>
  `:``,u=o?``:`<div class="no-schedule">
        <span class="no-schedule-icon">🎉</span>
        <p>오늘은 일정이 없어요!</p>
      </div>`,d=o&&i.length===0&&a.length===0?`<div class="all-done">
          <span class="all-done-icon">✨</span>
          <p>오늘 일정을 모두 마쳤어요!</p>
        </div>`:``;return`
    <div class="child-card" style="--child-color: ${e.color}; --child-color-light: ${e.colorLight}; --child-color-glow: ${e.colorGlow}" data-child-id="${e.id}">
      <div class="child-card-header">
        <div class="child-avatar" style="background: ${e.color}">
          ${e.emoji}
        </div>
        <div class="child-info">
          <h2 class="child-name">${e.name}</h2>
          <span class="child-schedule-count">${n.length}개 일정</span>
        </div>
      </div>

      <div class="child-timeline" data-child-timeline="${e.id}">
        ${M(n,e.color,t)}
      </div>

      <div class="child-schedules" data-child-schedules="${e.id}">
        ${u}
        ${s}
        ${c}
        ${l}
        ${d}
      </div>
    </div>
  `}var P={},F=null;function I(e,t){P[e]=t}function L(e){F!==e&&(F=e,window.location.hash=e,R())}function R(){let e=P[F||`/`];e&&e()}function z(){window.addEventListener(`hashchange`,()=>{F=window.location.hash.slice(1)||`/`,R()}),F=window.location.hash.slice(1)||`/`,R()}var B=[`👧`,`👦`,`👶`,`🧒`,`👸`,`🤴`,`🧒`],V=[{icon:`🏫`,label:`학교`},{icon:`📚`,label:`학원`},{icon:`🎹`,label:`피아노`},{icon:`🔢`,label:`수학`},{icon:`🥋`,label:`태권도`},{icon:`🎨`,label:`미술`},{icon:`🩰`,label:`발레`},{icon:`⚽`,label:`축구`},{icon:`🏊`,label:`수영`},{icon:`🇺🇸`,label:`영어`},{icon:`✏️`,label:`논술`},{icon:`🧪`,label:`과학`},{icon:`💻`,label:`코딩`},{icon:`🌈`,label:`유치원`}],H=[`일`,`월`,`화`,`수`,`목`,`금`,`토`],U=null,W=null;function G(){let e=n();W===null&&e.length>0&&(W=e[0].id),e.length>0&&!e.find(e=>e.id===W)&&(W=e[0].id);let t=e.find(e=>e.id===W),r=e.map(e=>`
    <button class="child-tab ${e.id===W?`child-tab-active`:``}"
            data-action="switch-tab" data-child-id="${e.id}"
            style="--tab-color: ${e.color}">
      <span class="child-tab-emoji">${e.emoji}</span>
      <span class="child-tab-name">${e.name}</span>
    </button>
  `).join(``),i=t?`
    <div class="admin-child-card" style="--child-color: ${t.color}">
      <div class="admin-child-header">
        <div class="admin-child-info">
          <span class="admin-child-emoji">${t.emoji}</span>
          <input type="text" class="admin-child-name-input" value="${t.name}" 
                 data-child-id="${t.id}" placeholder="이름 입력" />
        </div>
        <div class="admin-child-actions">
          <select class="admin-emoji-select" data-child-id="${t.id}">
            ${B.map(e=>`<option value="${e}" ${e===t.emoji?`selected`:``}>${e}</option>`).join(``)}
          </select>
          <button class="btn btn-danger btn-sm" data-action="delete-child" data-child-id="${t.id}">
            🗑️ 삭제
          </button>
        </div>
      </div>

      <div class="admin-schedules">
        <div class="admin-schedules-header">
          <h3>📅 일정 목록</h3>
          <button class="btn btn-primary btn-sm" data-action="add-schedule" data-child-id="${t.id}">
            + 일정 추가
          </button>
        </div>

        ${t.schedules.length===0?`<p class="admin-empty">등록된 일정이 없습니다</p>`:t.schedules.map(e=>q(t.id,e)).join(``)}
      </div>
    </div>
  `:`<p class="admin-empty">아이를 추가해 주세요</p>`;return`
    <header class="dashboard-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="header-title">
            <span class="header-icon">⚙️</span>
            스케줄 관리
          </h1>
          <p class="header-subtitle">아이 등록 및 일정 관리</p>
        </div>
        <div class="header-right" style="display: flex; align-items: center; gap: 16px;">
          <button class="btn btn-ghost" id="btn-toggle-theme-admin" title="테마 변경" style="font-size: 1.5rem; padding: 8px;">
            ${document.documentElement.classList.contains(`light-theme`)?`🌙`:`☀️`}
          </button>
          <button class="btn btn-ghost" id="btn-back-dashboard">
            📋 대시보드로 돌아가기
          </button>
        </div>
      </div>
    </header>

    <main class="admin-container">
      ${K()}

      <div class="admin-toolbar">
        <button class="btn btn-primary" id="btn-add-child">
          👶 아이 추가
        </button>
        <button class="btn btn-outline btn-danger-outline" id="btn-reset-data">
          🔄 기본값으로 초기화
        </button>
      </div>

      ${e.length>0?`<div class="child-tabs">${r}</div>`:``}

      <div class="admin-children">
        ${i}
      </div>
    </main>
  `}function K(){let e=p(),t=h(),n=Object.keys(e),r=n.length>0?n.map(e=>`
      <div class="preset-item ${e===t?`preset-active`:``}">
        <div class="preset-info">
          <span class="preset-icon">${e===t?`✅`:`📁`}</span>
          <span class="preset-name">${e}</span>
          ${e===t?`<span class="preset-badge">사용 중</span>`:``}
        </div>
        <div class="preset-actions">
          ${e===t?`
            <button class="btn btn-ghost btn-sm" data-action="update-preset" data-preset-name="${e}">
              💾 덮어쓰기
            </button>
          `:`
            <button class="btn btn-ghost btn-sm" data-action="load-preset" data-preset-name="${e}">
              📂 불러오기
            </button>
          `}
          <button class="btn btn-danger btn-sm" data-action="delete-preset" data-preset-name="${e}">
            🗑️
          </button>
        </div>
      </div>
    `).join(``):`<p class="preset-empty">저장된 프리셋이 없습니다. 현재 일정을 프리셋으로 저장해 보세요!</p>`;return`
    <div class="preset-section">
      <div class="preset-header">
        <div class="preset-title">
          <span>📋</span>
          <h3>일정 세트 (프리셋)</h3>
          ${t?`<span class="preset-current-badge">${t}</span>`:``}
        </div>
        <button class="btn btn-primary btn-sm" id="btn-save-preset">
          💾 현재 일정 저장
        </button>
      </div>
      <div class="preset-list">
        ${r}
      </div>
    </div>
  `}function q(e,t){if(U&&U.childId===e&&U.scheduleId===t.id)return ae(e,t);let n=t.days.map(e=>`<span class="day-tag active">${H[e]}</span>`).join(``),r=t.supplies.map(e=>`<span class="supply-tag">${e}</span>`).join(``),i=t.tasks.map(e=>`<span class="task-item">${e}</span>`).join(``);return`
    <div class="admin-schedule-item" data-schedule-id="${t.id}">
      <div class="admin-schedule-main">
        <div class="admin-schedule-info">
          <span class="admin-schedule-icon">${t.icon}</span>
          <div>
            <div class="admin-schedule-name">${t.name}</div>
            <div class="admin-schedule-type">${t.type===`school`?`학교/유치원`:`학원`}</div>
          </div>
        </div>
        <div class="admin-schedule-actions">
          <button class="btn btn-ghost btn-sm" data-action="edit-schedule" 
                  data-child-id="${e}" data-schedule-id="${t.id}">
            ✏️ 수정
          </button>
          <button class="btn btn-danger btn-sm" data-action="delete-schedule" 
                  data-child-id="${e}" data-schedule-id="${t.id}">
            🗑️
          </button>
        </div>
      </div>
      <div class="admin-schedule-details">
        <div class="admin-detail-row">
          <span class="admin-detail-label">등원</span>
          <span>${t.departureTime} → ${t.arrivalTime}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">하원</span>
          <span>${t.pickupTime} → ${t.returnTime}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">요일</span>
          <div class="day-tags">${n}</div>
        </div>
        ${r?`<div class="admin-detail-row"><span class="admin-detail-label">준비물</span><div class="supply-tags">${r}</div></div>`:``}
        ${i?`<div class="admin-detail-row"><span class="admin-detail-label">할 일</span><div class="task-tags">${i}</div></div>`:``}
      </div>
    </div>
  `}function J(e,t){let[n,r]=t.split(`:`).map(Number),i=Math.round(r/10)*10>=60?0:Math.round(r/10)*10;return`
    <div class="time-select-group">
      <select class="form-select" data-time-field="${e}" data-time-part="hour">
        ${Array.from({length:24},(e,t)=>`<option value="${t}" ${t===n?`selected`:``}>${String(t).padStart(2,`0`)}</option>`).join(``)}
      </select>
      <span class="time-select-separator">:</span>
      <select class="form-select" data-time-field="${e}" data-time-part="min">
        ${[0,10,20,30,40,50].map(e=>`<option value="${e}" ${e===i?`selected`:``}>${String(e).padStart(2,`0`)}</option>`).join(``)}
      </select>
    </div>
  `}function ae(e,t){return`
    <div class="admin-schedule-edit" data-schedule-id="${t.id}">
      <div class="edit-form">
        <div class="form-row">
          <div class="form-group">
            <label>유형</label>
            <select class="form-select" data-field="type">
              <option value="school" ${t.type===`school`?`selected`:``}>학교/유치원</option>
              <option value="academy" ${t.type===`academy`?`selected`:``}>학원</option>
            </select>
          </div>
          <div class="form-group">
            <label>아이콘</label>
            <select class="form-select" data-field="icon">
              ${V.map(e=>`<option value="${e.icon}" ${e.icon===t.icon?`selected`:``}>${e.icon} ${e.label}</option>`).join(``)}
            </select>
          </div>
          <div class="form-group flex-grow">
            <label>이름</label>
            <input type="text" class="form-input" data-field="name" value="${t.name}" placeholder="예: 한빛초등학교" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>출발</label>
            ${J(`departureTime`,t.departureTime)}
          </div>
          <div class="form-group">
            <label>도착</label>
            ${J(`arrivalTime`,t.arrivalTime)}
          </div>
          <div class="form-group">
            <label>하원</label>
            ${J(`pickupTime`,t.pickupTime)}
          </div>
          <div class="form-group">
            <label>귀가</label>
            ${J(`returnTime`,t.returnTime)}
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full-width">
            <label>요일</label>
            <div class="day-selector">
              ${H.map((e,n)=>`<button type="button" class="day-btn ${t.days.includes(n)?`active`:``}" data-day="${n}">${e}</button>`).join(``)}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group flex-grow">
            <label>준비물 <span class="form-hint">(쉼표로 구분)</span></label>
            <input type="text" class="form-input" data-field="supplies" 
                   value="${t.supplies.join(`, `)}" placeholder="교과서, 필기도구, 물통" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group flex-grow">
            <label>할 일 <span class="form-hint">(쉼표로 구분)</span></label>
            <input type="text" class="form-input" data-field="tasks" 
                   value="${t.tasks.join(`, `)}" placeholder="알림장 확인, 숙제 챙기기" />
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" data-action="save-schedule" 
                  data-child-id="${e}" data-schedule-id="${t.id}">
            💾 저장
          </button>
          <button class="btn btn-ghost" data-action="cancel-edit">
            취소
          </button>
        </div>
      </div>
    </div>
  `}var Y=null;function oe(e){Y&&Y.abort(),Y=new AbortController;let{signal:t}=Y,n=document.getElementById(`app`);n.addEventListener(`click`,t=>{let n=t.target.closest(`[data-action]`);if(!n)return;let r=n.dataset.action,i=n.dataset.childId?Number(n.dataset.childId):null,a=n.dataset.scheduleId||null;switch(r){case`delete-child`:confirm(`정말 이 아이를 삭제하시겠어요?`)&&(o(i),e());break;case`add-schedule`:{let t=s(i,{type:`academy`,name:`새 일정`,icon:`📚`,departureTime:`15:00`,arrivalTime:`15:15`,pickupTime:`16:00`,returnTime:`16:15`,days:[1,2,3,4,5],tasks:[],supplies:[]});t&&(U={childId:i,scheduleId:t.id},e());break}case`edit-schedule`:U={childId:i,scheduleId:a},e();break;case`cancel-edit`:U=null,e();break;case`save-schedule`:se(i,a),U=null,e();break;case`delete-schedule`:confirm(`이 일정을 삭제하시겠어요?`)&&(l(i,a),e());break;case`switch-tab`:W=i,U=null,e();break;case`load-preset`:{let t=n.dataset.presetName;confirm(`'${t}' 일정을 불러오시겠습니까? 현재 일정은 덮어쓰여집니다.`)&&(v(t),e());break}case`update-preset`:{let t=n.dataset.presetName;confirm(`현재 일정을 '${t}'에 덮어쓰시겠습니까?`)&&(_(t),e());break}case`delete-preset`:{let t=n.dataset.presetName;confirm(`'${t}' 일정을 삭제하시겠습니까?`)&&(ee(t),e());break}}},{signal:t}),n.addEventListener(`click`,e=>{e.target.classList.contains(`day-btn`)&&e.target.classList.toggle(`active`)},{signal:t}),n.addEventListener(`change`,e=>{e.target.classList.contains(`admin-child-name-input`)&&a(Number(e.target.dataset.childId),{name:e.target.value}),e.target.classList.contains(`admin-emoji-select`)&&a(Number(e.target.dataset.childId),{emoji:e.target.value})},{signal:t});let r=document.getElementById(`btn-back-dashboard`);r&&r.addEventListener(`click`,()=>L(`/`),{signal:t});let c=document.getElementById(`btn-toggle-theme-admin`);c&&(c.addEventListener(`click`,()=>{Q()},{signal:t}),document.addEventListener(`theme-changed`,e=>{c.textContent=e.detail.isLight?`🌙`:`☀️`},{signal:t}));let d=document.getElementById(`btn-add-child`);d&&d.addEventListener(`click`,()=>{i({name:`새 아이`,emoji:`🧒`}),e()},{signal:t});let f=document.getElementById(`btn-reset-data`);f&&f.addEventListener(`click`,()=>{confirm(`모든 데이터를 기본값으로 초기화하시겠어요?
현재 변경사항이 모두 사라집니다.`)&&(u(),e())},{signal:t});let p=document.getElementById(`btn-save-preset`);p&&p.addEventListener(`click`,()=>{let t=prompt(`저장할 일정 세트의 이름을 입력하세요
(예: 방학 스케줄, 새학기)`);t&&t.trim()&&(_(t.trim()),e())},{signal:t})}function se(e,t){let n=document.querySelector(`.admin-schedule-edit[data-schedule-id="${t}"]`);if(!n)return;let r=e=>{let t=n.querySelector(`[data-field="${e}"]`);return t?t.value:``},i=[];n.querySelectorAll(`.day-btn.active`).forEach(e=>{i.push(Number(e.dataset.day))});let a=r(`supplies`),o=r(`tasks`),s=e=>{let t=n.querySelector(`[data-time-field="${e}"][data-time-part="hour"]`),r=n.querySelector(`[data-time-field="${e}"][data-time-part="min"]`);return!t||!r?`00:00`:`${String(t.value).padStart(2,`0`)}:${String(r.value).padStart(2,`0`)}`};c(e,t,{type:r(`type`),icon:r(`icon`),name:r(`name`),departureTime:s(`departureTime`),arrivalTime:s(`arrivalTime`),pickupTime:s(`pickupTime`),returnTime:s(`returnTime`),days:i.sort(),supplies:a?a.split(`,`).map(e=>e.trim()).filter(Boolean):[],tasks:o?o.split(`,`).map(e=>e.trim()).filter(Boolean):[]})}var X=document.getElementById(`app`),Z=null;function Q(){let e=document.documentElement.classList.toggle(`light-theme`);localStorage.setItem(`kids-schedule-theme`,e?`light`:`dark`),document.dispatchEvent(new CustomEvent(`theme-changed`,{detail:{isLight:e}}))}function ce(){localStorage.getItem(`kids-schedule-theme`)===`light`&&document.documentElement.classList.add(`light-theme`)}function le(){let e=new Date,t=n(),r=t.map(t=>N(t,e)).join(``);X.innerHTML=`
    ${T(e)}
    <main class="dashboard-grid">
      ${r}
    </main>
    <button class="nav-admin-btn" id="btn-go-admin" title="스케줄 관리">
      ⚙️
    </button>
  `,document.getElementById(`btn-go-admin`)?.addEventListener(`click`,()=>{L(`/admin`)}),D(),de(t)}function ue(){$();let e=()=>{X.innerHTML=G(),oe(e)};e()}function de(e){$(),Z=setInterval(()=>{let e=new Date,t=n();E(e),t.forEach(t=>{let n=document.querySelector(`[data-child-schedules="${t.id}"]`),r=document.querySelector(`[data-child-timeline="${t.id}"]`);if(n){let i=document.createElement(`div`);i.innerHTML=N(t,e);let a=i.querySelector(`[data-child-schedules="${t.id}"]`),o=i.querySelector(`[data-child-timeline="${t.id}"]`);a&&n.innerHTML!==a.innerHTML&&(n.innerHTML=a.innerHTML),r&&o&&r.innerHTML!==o.innerHTML&&(r.innerHTML=o.innerHTML)}})},1e3)}function $(){Z&&=(clearInterval(Z),null)}I(`/`,le),I(`/admin`,ue),ce(),z();