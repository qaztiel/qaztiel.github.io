(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "dark"); // default dark for brand
  root.setAttribute("data-theme", initial);

  const themeBtn = document.getElementById("themeToggle");
  function setTheme(next){
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    if(themeBtn){
      themeBtn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      themeBtn.title = next === "dark" ? "Switch to light" : "Switch to dark";
      themeBtn.innerText = next === "dark" ? "☀️" : "🌙";
    }
  }
  if(themeBtn){
    setTheme(root.getAttribute("data-theme"));
    themeBtn.addEventListener("click", ()=>{
      const cur = root.getAttribute("data-theme");
      setTheme(cur === "dark" ? "light" : "dark");
    });
  }

  // Mobile drawer
  const drawer = document.getElementById("mobileDrawer");
  const openBtn = document.getElementById("menuOpen");
  const closeBtn = document.getElementById("menuClose");

  function openDrawer(){
    if(!drawer) return;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden","false");
  }
  function closeDrawer(){
    if(!drawer) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden","true");
  }

  if(openBtn) openBtn.addEventListener("click", openDrawer);
  if(closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if(drawer){
    drawer.addEventListener("click", (e)=>{
      if(e.target === drawer) closeDrawer();
    });
    drawer.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener("click", closeDrawer);
    });
  }
})();