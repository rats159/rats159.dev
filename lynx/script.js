import { Page, ElementChain, AttributeChain, Solo } from "../scripts/Lynx.js";
import {
    RainbowText,
    ColorBlob,
    AccordionList,
    Link,
    CodeBlock,
    Code,
    Unstyled,
    List,
} from "../scripts/components.js";

new Page()
    .Header({
        children: new ElementChain().Hgroup({
            children: new ElementChain()
                .Component(
                    ColorBlob({
                        x: "50%",
                        y: "4rem",
                        size: "4rem",
                        color: "magenta",
                        blurriness: "128rem",
                    })
                )
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
        children: new ElementChain()
            .Section({
                attributes: new AttributeChain().ID("faq"),
                children: new ElementChain()
                    .H2({
                        children: new ElementChain().Text("FAQ:"),
                    })
                    .Component(
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
                                        .Component(
                                            Code(
                                                'import * as Lynx from "./lynx.js"'
                                            )
                                        )
                                        .Text(" or ")
                                        .Component(
                                            Code(
                                                'import {Page, ElementChain, AttributeChain, Solo, Signal} from "./lynx.js"'
                                            )
                                        ),
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
                                            "Long answer? I think that verbosity can be incredibly useful at scale. While I will readily admit that simple tasks in Lynx are far more verbose than they need to be, I think this is the best way to do it without making my own HTML/XML format. I'm considering transitioning the entire library over to pipelines if "
                                        )
                                        .Component(
                                            Link(
                                                "https://github.com/tc39/proposal-pipeline-operator",
                                                "this proposal"
                                            )
                                        )
                                        .Text(" ever gets accepted."),
                                }),
                            },
                            {
                                buttonText: "I have some other question.",
                                innerData: new Solo({
                                    children: new ElementChain()
                                        .Text(
                                            "Message me about it! My discord is "
                                        )
                                        .Code({
                                            children: new ElementChain().Text(
                                                "ra.ts"
                                            ),
                                            attributes: new AttributeChain()
                                                .Style("display:inline;")
                                                .Class("code"),
                                        }),
                                }),
                            },
                        ])
                    ),
            })
            .Section({
                attributes: new AttributeChain().ID("examples"),
                children: new ElementChain()
                    .H2({
                        children: new ElementChain().Text("Examples"),
                    })
                    .H3({
                        children: new ElementChain().Text("Basic Boilerplate"),
                    })
                    .Text("Every Lynx project has a little boilerplate:")
                    .Component(
                        CodeBlock(
                            'import * as Lynx from "./lynx.js"\n\n//Every Lynx project needs a Page\nnew Lynx.Page()\n//Your stuff goes here\n.render()'
                        )
                    )
                    .Text("Let's add some stuff!")
                    .Component(
                        CodeBlock(
                            `import * as Lynx from "./lynx.js"

new Lynx.Page()
    .H1({
        children: new Lynx.ElementChain().Text("Hello!")
    })
    .render()`
                        )
                    )
                    .Text("And that turns into (approximately) this:")
                    .Component(
                        Unstyled(
                            new ElementChain().Span({
                                attributes: new AttributeChain().Class("h1"),
                                children: new ElementChain().Text("Hello!"),
                            })
                        )
                    )
                    .Hr()
                    .H3({
                        children: new ElementChain().Text("Nested Elements"),
                    })
                    .Text(
                        "Let's try something a little more advanced, like a list:"
                    )
                    .Component(
                        CodeBlock(`new Lynx.Page()
    .Ul({
        children: new Lynx.ElementChain()
            .Li({children:new Lynx.ElementChain().Text("Hello!")})
            .Li({children:new Lynx.ElementChain().Text("Hello!")})
            .Li({children:new Lynx.ElementChain().Text("Hello!")})
            .Li({children:new Lynx.ElementChain().Text("Hello!")})
            .Li({children:new Lynx.ElementChain().Text("Hello!")})
    })
    .render()`)
                    )
                    .Text("Which renders out as:")
                    .Component(
                        Unstyled(
                            new ElementChain().Ul({
                                children: new ElementChain()
                                    .Li({
                                        children: new ElementChain().Text(
                                            "Hello!"
                                        ),
                                    })
                                    .Li({
                                        children: new ElementChain().Text(
                                            "Hello!"
                                        ),
                                    })
                                    .Li({
                                        children: new ElementChain().Text(
                                            "Hello!"
                                        ),
                                    })
                                    .Li({
                                        children: new ElementChain().Text(
                                            "Hello!"
                                        ),
                                    })
                                    .Li({
                                        children: new ElementChain().Text(
                                            "Hello!"
                                        ),
                                    }),
                            })
                        )
                    )
                    .Hr()
                    .H3({
                        children: new ElementChain().Text("Components"),
                    })
                    .H4({
                        children: new ElementChain().Text("Creation:"),
                    })
                    .Text(
                        "That last example was okay, but it's kinda a lot of repeated code. "
                    )
                    .Text(
                        'That\'s what Components are for in Lynx. You can make them in pretty much any way you want, but the "canonical" way is with closures.'
                    )
                    .Component(
                        CodeBlock(`// In some other file, say, 'components.js'
export function List(...items){
    return () => {
        return new Lynx.Solo({
            element: "ul",
            children: new Lynx.ElementChain().Many(
                items.map((item) => ListItem(item))
            ),
        });
    }
}
                        
export function ListItem(item){
    return () => new Lynx.Solo({
        element:'li',
        children: new Lynx.ElementChain()
            .Text(item)
    })
}`)
                    )
                    .Text(
                        "In this example, we use Lynx.Solo to create one element. We also use .Many() to append multiple components at once."
                    )
                    .H4({
                        children: new ElementChain().Text("Using:"),
                    })
                    .Text("Using a component in Lynx is super easy:")
                    .Component(
                        CodeBlock(`import {List} from './components.js'
                        
new Lynx.Page()
    .Component(
        List(
            "Hello!",
            "Hello!",
            "Hello!",
            "Hello!",
            "Hello!"
        )
    )`)
                    )
                    .Component(
                        Unstyled(
                            new ElementChain().Component(
                                List(
                                    "Hello!",
                                    "Hello!",
                                    "Hello!",
                                    "Hello!",
                                    "Hello!"
                                )
                            )
                        )
                    )
                    .Hr()
                    .H2({}),
            }),
    })
    .render();
