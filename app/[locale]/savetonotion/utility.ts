export const closeModal = () => {
  window.parent.postMessage({ s: "notion-harvest", type: "closeModal" }, "*");
};
