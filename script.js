import * as Lynx from "./Lynx.js";
import {
    Link,
    List,
    Section,
    Comment,
    TypeWriter,
    RainbowLink,
} from "./components.js";

new Lynx.Page()
    .Header({
        children: new Lynx.ElementChain()
            .Component(TypeWriter("Hi, I'm Rats!", 100, "h1"))
            .Nav({
                children: new Lynx.ElementChain()
                    .Component(Link("#about", "About me"))
                    .Component(Link("#projects", "My projects"))
                    .Component(Link("#site", "About the site")),
            }),
    })
    .Main({
        children: new Lynx.ElementChain()
            .Component(
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
                                ". I'm mainly a Java and Web developer, but I have at least some experience in all of the following languages:"
                            )
                            .Component(
                                List(
                                    "Java",
                                    "TypeScript",
                                    "The web trio (CSS,JS,HTML)",
                                    "C",
                                    "Rust"
                                )
                            )
                            .Text(
                                "There are a lot of things I've been meaning to try. This includes but is not limited to:"
                            )
                            .Component(
                                List(
                                    "C++",
                                    "C#",
                                    "Go",
                                    "Gleam",
                                    "Haskell",
                                    "React",
                                    "SolidJS",
                                    "TailwindCSS"
                                )
                            )
                            .Component(Comment("//TODO: Expand this"))
                            .Component(
                                Comment("//TODO: Start caring about TODOs")
                            ),
                        // .Ul({
                        //     children: new Lynx.ElementChain().Li({
                        //         attributes: new Lynx.AttrChain().Text("Java"),
                        //     }),
                        // }),
                    })
                )
            )
            .Component(
                Section(
                    "projects",
                    "My Projects:",
                    new Lynx.Solo({
                        element: "p",
                        children: new Lynx.ElementChain()
                            .Text("Ongoing:")
                            .Component(
                                List(
                                    "This site",
                                    "Lynx (see below)",
                                    "Palladium",
                                    "Mini-Scrabble"
                                )
                            )
                            .Component(
                                Comment(
                                    "//TODO: Finish anything. Literally just one thing."
                                )
                            ),
                    })
                )
            )
            .Component(
                Section(
                    "site",
                    "About the Site:",
                    new Lynx.Solo({
                        element: "p",
                        children: new Lynx.ElementChain()
                            .Text("This site is built using ")
                            .Component(RainbowLink("Lynx", "/lynx"))
                            .Text(
                                ". A library I built to make component-based web building faster, easier, and immediate."
                            )
                            .Text(
                                " With Lynx, there's no compiler step, build step, or heavy libraries."
                            )
                            .Text(
                                " Lynx is built on method chaining, so the entire site collapses into one call and runs immediately on page load."
                            ),
                    })
                )
            ),
    })
    .render();
