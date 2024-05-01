import { Page, ElementChain, AttributeChain } from "../scripts/Lynx.js";
import { RainbowText, ColorBlob } from "../scripts/components.js";

new Page()
    .Component(
        ColorBlob({
            x: "50%",
            y: "50%",
            size: "16rem",
            color: "magenta",
            blurriness: "128rem",
        })
    )
    .Header({
        children: new ElementChain().H1({
            children: new ElementChain()
                .Text("Welcome to ")
                .Component(RainbowText("Lynx", "span"))
                .Text("."),
        }),
    })
    .render();
