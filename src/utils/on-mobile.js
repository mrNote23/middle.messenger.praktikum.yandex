export class OnMobile {
  static showLeftPanel = () => {
    document.getElementById("sidebar").classList.remove("hidden");
    document.getElementById("chat").classList.remove("show");
  };

  static showRightPanel = () => {
    const backEnabled =
      window.getComputedStyle(document.querySelector(".sidebar-group")).zIndex >
      99;

    if (backEnabled) {
      document.getElementById("sidebar").classList.add("hidden");
      document.getElementById("chat").classList.add("show");
    }
  };
}
