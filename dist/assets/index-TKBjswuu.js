(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))m(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&m(i)}).observe(document,{childList:!0,subtree:!0});function v(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function m(n){if(n.ep)return;n.ep=!0;const r=v(n);fetch(n.href,r)}})();document.addEventListener("DOMContentLoaded",function(){const u=document.querySelector(".hamburger"),l=document.querySelector(".nav-menu"),v=document.querySelectorAll(".nav-link");u.addEventListener("click",function(){u.classList.toggle("active"),l.classList.toggle("active")}),v.forEach(e=>{e.addEventListener("click",function(){u.classList.remove("active"),l.classList.remove("active")})});const m=document.querySelector(".particle-container");for(let e=0;e<50;e++){const t=document.createElement("div");t.style.cssText=`
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random()*100}%;
            top: ${Math.random()*100}%;
            animation: float ${5+Math.random()*10}s infinite;
        `,m.appendChild(t)}const n=document.createElement("style");n.textContent=`
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random()*200-100}px, ${Math.random()*200-100}px);
                opacity: 0;
            }
        }
    `,document.head.appendChild(n);const r=document.querySelectorAll(".star-input"),i=document.getElementById("rating");r.forEach((e,t)=>{e.addEventListener("click",function(){const o=this.getAttribute("data-rating");i.value=o,r.forEach((a,s)=>{s<o?a.classList.add("active"):a.classList.remove("active")})})}),r.forEach(e=>e.classList.add("active")),i.value="5";const y=document.getElementById("reviewForm");y.addEventListener("submit",function(e){e.preventDefault();const t=document.getElementById("clientName").value,o=parseInt(document.getElementById("rating").value),a=document.getElementById("reviewText").value,s={name:t,rating:o,text:a,date:new Date().toISOString()};let d=JSON.parse(localStorage.getItem("reviews"))||[];d.push(s),localStorage.setItem("reviews",JSON.stringify(d)),y.reset(),r.forEach(f=>f.classList.add("active")),i.value="5",h(),w();const c=document.createElement("div");c.textContent="Thank you! Your review has been submitted.",c.style.cssText=`
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #00d4ff, #7b2ff7);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 1.1rem;
            z-index: 10000;
            animation: slideDown 0.5s ease;
        `,document.body.appendChild(c),setTimeout(()=>{c.style.animation="slideUp 0.5s ease",setTimeout(()=>c.remove(),500)},3e3)});function h(){const e=document.getElementById("reviewsList"),t=JSON.parse(localStorage.getItem("reviews"))||[];t.sort((o,a)=>new Date(a.date)-new Date(o.date)),e.innerHTML="",t.forEach(o=>{const a=document.createElement("div");a.className="review-card";const s="★".repeat(o.rating)+"☆".repeat(5-o.rating);a.innerHTML=`
                <div class="review-header">
                    <div class="review-author">${x(o.name)}</div>
                    <div class="review-stars">${s}</div>
                </div>
                <div class="review-text">${x(o.text)}</div>
            `,e.appendChild(a)})}function w(){const e=JSON.parse(localStorage.getItem("reviews"))||[],t=document.getElementById("overallRating"),o=document.getElementById("overallStars"),a=document.getElementById("reviewCount");if(e.length===0){t.textContent="5.0",o.innerHTML="★★★★★",a.textContent="0 Reviews";return}const d=e.reduce((M,C)=>M+C.rating,0)/e.length,c=Math.round(d*10)/10;t.textContent=c.toFixed(1);const f=Math.floor(d),E=d%1>=.5,I=5-f-(E?1:0);let g="★".repeat(f);E&&(g+="★"),g+="☆".repeat(I),o.innerHTML=g,a.textContent=`${e.length} Review${e.length!==1?"s":""}`}function x(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}h(),w();const S={threshold:.1,rootMargin:"0px 0px -100px 0px"},L=new IntersectionObserver(function(e){e.forEach(t=>{t.isIntersecting&&(t.target.style.opacity="1",t.target.style.transform="translateY(0)")})},S);document.querySelectorAll(".portfolio-item, .review-card, .contact-card").forEach(e=>{e.style.opacity="0",e.style.transform="translateY(30px)",e.style.transition="opacity 0.6s ease, transform 0.6s ease",L.observe(e)}),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const o=document.querySelector(this.getAttribute("href"));if(o){const a=document.querySelector(".navbar").offsetHeight,s=o.offsetTop-a;window.scrollTo({top:s,behavior:"smooth"})}})});const p=document.querySelector(".navbar");window.addEventListener("scroll",function(){window.pageYOffset>100?(p.style.background="rgba(10, 10, 15, 0.98)",p.style.boxShadow="0 5px 20px rgba(0, 212, 255, 0.1)"):(p.style.background="rgba(10, 10, 15, 0.95)",p.style.boxShadow="none")}),document.querySelectorAll(".portfolio-item").forEach((e,t)=>{e.style.animationDelay=`${t*.1}s`})});const b=document.createElement("style");b.textContent=`
    @keyframes slideDown {
        from {
            top: -100px;
            opacity: 0;
        }
        to {
            top: 100px;
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            top: 100px;
            opacity: 1;
        }
        to {
            top: -100px;
            opacity: 0;
        }
    }
`;document.head.appendChild(b);
