import * as Lynx from "./Lynx.js";
import { typeout } from "./typeout.js";

function Comment(text) {
    return () => {
        return new Lynx.Solo({
            element: "p",
            attributes: new Lynx.AttrChain().Class("comment").Text(text),
        });
    };
}

function Link(href, text) {
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

function ListItem(text) {
    return () => {
        return new Lynx.Solo({
            element: "li",
            attributes: new Lynx.AttrChain().Text(text),
        });
    };
}

function List(...items) {
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

function Section(id, title, content) {
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

new Lynx.Page()
    .Header({
        children: new Lynx.ElementChain()
            .H1({
                attributes: new Lynx.AttrChain()
                    .Text("Hello, World!")
                    .Immediate((element) => {
                        typeout("Hello, World!", 100, (text) => {
                            element.textContent = text;
                        });
                    }),
            })
            .Nav({
                children: new Lynx.ElementChain()
                    .Component(Link("#about", "About me"))
                    .Component(Link("#projects", "My projects"))
                    .Component(Link("#site", "About the site")),
            }),
    })
    .Main({
        children: new Lynx.ElementChain().Component(
            Section(
                "about",
                "About Me:",
                new Lynx.Solo({
                    element: "p",
                    children: new Lynx.ElementChain()
                        .Text(
                            `Most people call me rats. I've been programming for around `
                        )
                        .Span({
                            attributes: new Lynx.AttrChain()
                                .Text(new Date().getFullYear() - 2020)
                                .Class("special", "mono"),
                        })
                        .Text(
                            ` years now. For more about what I've done with that time, check out `
                        )

                        .Component(Link("#projects", "my projects"))
                        .Text(
                            ". I'm mainly a Java and web dev, but I have at least some experience in all of the following languages:"
                        )
                        .Component(
                            List(
                                "Java",
                                "The web trio (css,js,html)",
                                "C",
                                "Rust"
                            )
                        )
                        .Component(Comment("//TODO: Expand this"))
                        .Component(Comment("//TODO: Start caring about TODOs")),
                    // .Ul({
                    //     children: new Lynx.ElementChain().Li({
                    //         attributes: new Lynx.AttrChain().Text("Java"),
                    //     }),
                    // }),
                })
            )
        ),
        // .Component(Section("projects", "My Projects:"))
        // .Component(Section("site", "About the Site:")),
    })
    .render();
