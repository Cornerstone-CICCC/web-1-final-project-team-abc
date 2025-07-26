
 document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const galleries = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        galleries.forEach((g) => g.classList.add("hidden"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.remove("hidden");
      });
    });
  });
  console.log("Script loaded");

