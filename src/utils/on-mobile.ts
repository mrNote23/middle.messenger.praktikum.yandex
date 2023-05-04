export class OnMobile {
  static showLeftPanel = (): void => {
    document.getElementById("sidebar").classList.remove("hidden");
    document.getElementById("right-router").classList.remove("show");
  };

  static showRightPanel = (): void => {
    const backEnabled =
      +window.getComputedStyle(document.querySelector(".sidebar-group"))
        .zIndex > 99;

    if (backEnabled) {
      document.getElementById("sidebar").classList.add("hidden");
      document.getElementById("right-router").classList.add("show");
    }
  };
}
