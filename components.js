import * as Lynx from "./Lynx.js";
export function Comment(text) {
    return () => {
        return new Lynx.Solo({
            element: "p",
            attributes: new Lynx.AttrChain().Class("comment").Text(text),
        });
    };
}

export function Link(href, text) {
    return () => {
        return new Lynx.Solo({
            attributes: new Lynx.AttrChain()
                .HREF(href)
                .Text(text)
                .Class("link"),
            element: "a",
        });
    };
}

export function ListItem(text) {
    return () => {
        return new Lynx.Solo({
            element: "li",
            attributes: new Lynx.AttrChain().Text(text),
        });
    };
}

export function List(...items) {
    return () => {
        return new Lynx.Solo({
            element: "ul",
            children: new Lynx.ElementChain().Many(
                ...items.map((item) => {
                    return ListItem(item);
                })
            ),
        });
    };
}

export function Section(id, title, content) {
    return () => {
        return new Lynx.Solo({
            element: "section",
            attributes: new Lynx.AttrChain().ID(id),
            children: new Lynx.Solo({
                element: "article",
                children: new Lynx.ElementChain()
                    .H2({
                        attributes: new Lynx.AttrChain().Text(title),
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
            attributes: new Lynx.AttrChain().Immediate((element) => {
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
            }),
        });
}
