import { Page, ElementChain, AttributeChain, Solo } from "../scripts/Lynx.js";
import {
    RainbowText,
    ColorBlob,
    AccordionList,
    Link,
} from "../scripts/components.js";

new Page()
    .Component(
        ColorBlob({
            x: "50%",
            y: "4rem",
            size: "4rem",
            color: "magenta",
            blurriness: "128rem",
        })
    )
    .Header({
        children: new ElementChain().Hgroup({
            children: new ElementChain()
                .H1({
                    children: new ElementChain()
                        .Text("Welcome to ")
                        .Component(RainbowText("Lynx", "span"))
                        .Text("."),
                })
                .P({
                    children: new ElementChain().Text(
                        "A client-side HTML-Creation Library."
                    ),
                    attributes: new AttributeChain().Class("special"),
                }),
        }),
    })
    .Main({
        children: new ElementChain().Component(
            AccordionList([
                {
                    buttonText: "How do I use it?",
                    innerData: new Solo({
                        children: new ElementChain()
                            .Text("Download it from the ")
                            .Component(
                                Link(
                                    "https://github.com/rats159/Lynx",
                                    "github"
                                )
                            )
                            .Text(
                                " and place it alongside your other client-side scripts. Note that we use ESModules, which means you need to import it with either:"
                            )
                            .Code({
                                children: new ElementChain().Text(
                                    'import * as Lynx from "./lynx.js"'
                                ),
                            })
                            .Text(" or ")
                            .Code({
                                children: new ElementChain().Text(
                                    'import {Page, ElementChain, AttributeChain, Solo, Signal} from "./lynx.js"'
                                ),
                            }),
                    }),
                },
                {
                    buttonText: "Why the client?",
                    innerData: new Solo({
                        children: new ElementChain().Text(
                            "Putting your code on the client directly avoids any required building or compilation. Furthermore, if your code already has some build step, Lynx code remains untouched because it's just a client script."
                        ),
                    }),
                },
                {
                    buttonText: "Why is Lynx so verbose?",
                    innerData: new Solo({
                        children: new ElementChain()
                            .Text("Short answer? I'm a Java dev.")
                            .Br()
                            .Br()
                            .Text(
                                "Long answer? I think that verbosity can be incredibly useful at scale. While I will readily admit that simple tasks in Lynx are far more verbose than they need to be, I believe that at scale, this system shows itself to be self documenting and easier to read than other systems."
                            ),
                    }),
                },
                {
                    buttonText: "I have some other question.",
                    innerData: new Solo({
                        children: new ElementChain()
                            .Text("Message me about it! My discord is ")
                            .Code({
                                children: new ElementChain().Text("ra.ts"),
                                attributes: new AttributeChain().Style(
                                    "display:inline;"
                                ),
                            }),
                    }),
                },
            ])
        ),
    })
    .render();
