import { BodyComponent } from "mjml-core";

export default class MjCategoryMenu extends BodyComponent {
  static endingTag = false;

  static dependencies = {
    "mj-category-menu": [],
  };

  static allowedAttributes = {
    items: "string",
  };

  static defaultAttributes = {
    items: [],
  };

  renderСategory(item) {
    return `
      <mj-column css-class="category" background-color="${item.color}" width="50%" padding="15px 5px 0">
        <mj-text align="center" padding-bottom="3px" color="#181818" font-size="16px" font-weight="500" line-height="18px"><a href="${item.link}">${item.name}</a>
        </mj-text>
        <mj-image href="${item.link}" align="center" height="124px"  src="${item.src}"></mj-image>
      </mj-column>
    `;
  }

  render() {
    const items = JSON.parse(this.getAttribute("items"));
    return this.renderMJML(`
    <mj-section>
      <mj-group>
        ${this.renderСategory(items[0])}
        ${this.renderСategory(items[1])}
      </mj-group>
      <mj-group>
        ${this.renderСategory(items[2])}
        ${this.renderСategory(items[3])}
      </mj-group>
    </mj-section>
		`);
  }
}
