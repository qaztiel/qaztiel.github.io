(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "dark"); // default dark for brand
  root.setAttribute("data-theme", initial);

  const themeInput = document.getElementById("themeToggle");

  function applyTheme(next){
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    if(themeInput){
      // checked = dark
      themeInput.checked = (next === "dark");
    }
  }

  if(themeInput){
    applyTheme(root.getAttribute("data-theme"));
    themeInput.addEventListener("change", ()=>{
      applyTheme(themeInput.checked ? "dark" : "light");
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
  function toggleDrawer(){
    if(!drawer) return;
    drawer.classList.contains("open") ? closeDrawer() : openDrawer();
  }

  if(openBtn) openBtn.addEventListener("click", toggleDrawer);
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