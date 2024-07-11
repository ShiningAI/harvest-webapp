export const closeModal = () => {
  window.parent.postMessage({ s: "notion-harvest", type: "closeModal" }, "*");
};

export const updateHeight = (height: number) => {
  window.parent.postMessage(
    { s: "notion-harvest", type: "updateHeight", value: height },
    "*"
  );
};
