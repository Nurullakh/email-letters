import { BodyComponent } from "mjml-core";

export default class MjProductCard extends BodyComponent {
  static endingTag = false;

  static dependencies = {
    "mj-product-card": [],
  };

  static allowedAttributes = {
    link: "string",
    name: "string",
    "image-src": "string",
    "image-width": "unit(px,%)",
    price: "string",
    "price-type": "string",
  };

  static defaultAttributes = {
    link: null,
    name: "white",
    "image-src": null,
    "image-width": null,
    price: null,
    "price-type": null,
  };

  headStyle = () => `
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title__link {
        text-decoration: none;
        color: #000;
      }
    `;

  renderImage() {
    return `
      <mj-image
        ${this.htmlAttributes({
          src: this.getAttribute("image-src"),
          width: this.getAttribute("image-width"),
          height: this.getAttribute("image-height"),
          href: this.getAttribute("link"),
        })}
        align="center"
        padding-bottom="13px"
      />
    `;
  }

  render() {
    const priceType =
      this.getAttribute("price-type") &&
      `<mj-text padding="5px 0 3px" font-size="12px"  line-height="100%">
        ${this.getAttribute("price-type")}         
      </mj-text>`;
    return this.renderMJML(`
			<mj-column>
        ${this.renderImage()}
        <mj-text css-class="title" padding=" 0 0 5px" height="36px" font-size="14px" font-weight="400" line-height="19px"> <a class="title__link" href="${this.getAttribute(
          "link"
        )}">${this.getAttribute("name")} </a>
        </mj-text>
        ${priceType}
        <mj-text padding="0" font-size="17px" font-weight="500" line-height="100%">${this.getAttribute(
          "price"
        )}
        </mj-text>
			</mj-column>
		`);
  }
}
