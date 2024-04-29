/*
  hi this is lynx
  i made it myself
  its private on github
  take this code if you want
  ill publish it one day
  but for right now it's pretty bad
  so i wouldnt reccomend it
*/
export class ElementChain {
    constructor() {
        this.nodes = [];
    }

    _elem(
        attributes = new AttrChain(),
        children = new ElementChain(),
        name = "div"
    ) {
        const element = document.createElement(name);
        this.nodes.push(attributes.apply(element));
        element.append(...children.render());
        return this;
    }

    render() {
        return this.nodes;
    }

    Component(elem) {
        this.nodes.push(elem().render()[0]);
        return this;
    }

    Many(...components) {
        components.forEach((component) =>
            this.nodes.push(component().render()[0])
        );
        return this;
    }

    Text(txt) {
        this.nodes.push(new Text(txt));
        return this;
    }

    Header({ attributes, children } = {}) {
        return this._elem(attributes, children, "header");
    }

    Nav({ attributes, children } = {}) {
        return this._elem(attributes, children, "nav");
    }

    A({ attributes, children } = {}) {
        return this._elem(attributes, children, "a");
    }

    H1({ attributes, children } = {}) {
        return this._elem(attributes, children, "h1");
    }

    H2({ attributes, children } = {}) {
        return this._elem(attributes, children, "h2");
    }

    H3({ attributes, children } = {}) {
        return this._elem(attributes, children, "h3");
    }

    H4({ attributes, children } = {}) {
        return this._elem(attributes, children, "h4");
    }

    H5({ attributes, children } = {}) {
        return this._elem(attributes, children, "h5");
    }

    H6({ attributes, children } = {}) {
        return this._elem(attributes, children, "h6");
    }

    Ul({ attributes, children } = {}) {
        return this._elem(attributes, children, "ul");
    }

    Ol({ attributes, children } = {}) {
        return this._elem(attributes, children, "ol");
    }

    Li({ attributes, children } = {}) {
        return this._elem(attributes, children, "li");
    }

    Button({ attributes, children } = {}) {
        return this._elem(attributes, children, "button");
    }

    P({ attributes, children } = {}) {
        return this._elem(attributes, children, "p");
    }

    Span({ attributes, children } = {}) {
        return this._elem(attributes, children, "span");
    }

    Main({ attributes, children } = {}) {
        return this._elem(attributes, children, "main");
    }
    Section({ attributes, children } = {}) {
        return this._elem(attributes, children, "section");
    }
}

export class AttrChain {
    constructor() {
        this.nodes = [];
    }
    apply(elem) {
        for (const attrNode of this.nodes) {
            switch (attrNode.type) {
                case "immediate":
                    attrNode.value(elem);
                    break;
                case "classlist":
                    elem.classList.add(...attrNode.value);
                    break;
                case "onclick":
                    console.log(attrNode.value);
                    elem.addEventListener(
                        "click",
                        attrNode.value.bind(null, elem)
                    );
                    break;
                default:
                    elem[attrNode.type] = attrNode.value;
                    break;
            }
        }
        return elem;
    }

    Immediate(fn) {
        this.nodes.push({ type: "immediate", value: fn });
        return this;
    }

    Class(...classes) {
        this.nodes.push({ type: "classlist", value: classes });
        return this;
    }

    ID(id) {
        this.nodes.push({ type: "id", value: id });
        return this;
    }

    Text(value) {
        this.nodes.push({ type: "textContent", value });
        return this;
    }

    OnClick(value) {
        this.nodes.push({ type: "onclick", value });
        return this;
    }

    HREF(value) {
        this.nodes.push({ type: "href", value });
        return this;
    }

    OnLoad(value) {
        this.nodes.push({ type: "onload", value });
        return this;
    }
}

export class Page extends ElementChain {
    render() {
        for (const element of this.nodes) {
            document.body.appendChild(element);
        }
    }
}

export class Solo {
    constructor({
        attributes = new AttrChain(),
        children = new ElementChain(),
        element = "div",
    }) {
        this.attributes = attributes;
        this.children = children;
        this.element = element;
    }

    render() {
        const element = this.attributes.apply(
            document.createElement(this.element)
        );
        element.append(...this.children.render());
        return [element];
    }
}

export class Signal {
    constructor(initialValue) {
        this.value = initialValue;
        this.effects = [];
        this.alwaysEffects = [];
    }

    get() {
        return this.value;
    }

    set(value) {
        let dirty = true;
        if (this.value == value) {
            dirty = false;
        }
        this.value = value;
        if (dirty) {
            for (const effect of this.effects) {
                effect(this);
            }
        }

        for (const effect of this.alwaysEffects) {
            effect(this);
        }
    }

    addEffect(fn, always) {
        if (always) {
            this.alwaysEffects.push(fn);
        } else {
            this.effects.push(fn);
        }
    }
}
