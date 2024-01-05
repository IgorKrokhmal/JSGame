export default class DescriptionHandler {
  constructor() {
    this.descriptionElement = document.createElement("div");
    this.descriptionElement.classList.add("description-popup");
    this.attachEvents();
  }

  showDescription(event) {
    this.descriptionElement.textContent = event.target.dataset.description;
    event.target.parentNode.appendChild(this.descriptionElement);
  }

  hideDescription() {
    if (this.descriptionElement.parentNode) {
      this.descriptionElement.parentNode.removeChild(this.descriptionElement);
    }
  }

  attachEvents() {
    const navigationBar = document.getElementsByTagName("nav")[0];
    for (let i = 0; i < navigationBar.children.length; i++) {
      const navButton = navigationBar.children[i];
      navButton.addEventListener("mouseover", this.showDescription.bind(this));
      navButton.addEventListener("mouseout", this.hideDescription.bind(this));
    }
  }
}
