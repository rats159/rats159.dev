import * as Lynx from "./Lynx.js";
export function Comment(text) {
    return () => {
        return new Lynx.Solo({
            element: "p",
            attributes: new Lynx.AttributeChain().Class("comment"),
            children: new Lynx.ElementChain().Text(text),
        });
    };
}

export function Link(href, text) {
    return () => {
        return new Lynx.Solo({
            attributes: new Lynx.AttributeChain().HREF(href).Class("link"),
            children: new Lynx.ElementChain().Text(text),
            element: "a",
        });
    };
}

export function ListItem(text) {
    return () => {
        return new Lynx.Solo({
            element: "li",
            children: new Lynx.ElementChain().Text(text),
        });
    };
}

export function List(...items) {
    return () => {
        return new Lynx.Solo({
            element: "ul",
            children: new Lynx.ElementChain().Many(
                items.map((item) => {
                    return ListItem(item);
                })
            ),
        });
    };
}

export function AccordionItem(data) {
    return () => {
        return new Lynx.Solo({
            element: "li",
            attributes: new Lynx.AttributeChain().Class("collapsible"),
            children: new Lynx.ElementChain()
                .Label({
                    children: new Lynx.ElementChain()
                        .Input({
                            attributes: new Lynx.AttributeChain().Type(
                                "checkbox"
                            ),
                            children: new Lynx.ElementChain(),
                        })
                        .Text(data.buttonText),
                })
                .Component(() => data.innerData),
        });
    };
}

export function AccordionList(data) {
    return () => {
        return new Lynx.Solo({
            element: "ul",
            attributes: new Lynx.AttributeChain().Class("accordion-list"),
            children: new Lynx.ElementChain().Many(
                data.map((d) => AccordionItem(d))
            ),
        });
    };
}

export function Section(id, title, content) {
    return () => {
        return new Lynx.Solo({
            element: "section",
            attributes: new Lynx.AttributeChain().ID(id),
            children: new Lynx.Solo({
                element: "article",
                children: new Lynx.ElementChain()
                    .H2({
                        children: new Lynx.ElementChain().Text(title),
                    })
                    .Component(() => content),
            }),
        });
    };
}

export function TypeWriter(text, delay = 100, element = "p") {
    return () =>
        new Lynx.Solo({
            element,
            attributes: new Lynx.AttributeChain()
                .Immediate((element) => {
                    async function typeout(string) {
                        if (string == "") {
                            return;
                        }
                        await typeout(string.substring(0, string.length - 1));
                        element.textContent = string;
                        return new Promise(async (resolve) => {
                            setTimeout(resolve, delay);
                        });
                    }

                    typeout(text);
                })
                .Class("typewriter"),
        });
}

export function RainbowLink(text, href) {
    return () => {
        return new Lynx.Solo({
            element: "a",
            attributes: new Lynx.AttributeChain()
                .Class("rainbow", "special", "link")
                .HREF(href),
            children: new Lynx.ElementChain().Text(text),
        });
    };
}

export function RainbowText(text, element = "p") {
    return () => {
        return new Lynx.Solo({
            element,
            attributes: new Lynx.AttributeChain().Class("rainbow", "special"),
            children: new Lynx.ElementChain().Text(text),
        });
    };
}

export function ColorBlob(circleData) {
    return () =>
        new Lynx.Solo({
            attributes: new Lynx.AttributeChain()
                .Class("weirdcircle")
                .Style(
                    `--x:${circleData.x};--y:${circleData.y};--size:${circleData.size};--color:${circleData.color};--blurriness:${circleData.blurriness};`
                ),
        });
}

export function ColorBlobs(circleDatas) {
    return () => {
        return new Lynx.Solo({
            element: "div",
            children: new Lynx.ElementChain().Many(circleDatas.map(ColorBlob)),
        });
    };
}
