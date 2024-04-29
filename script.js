import * as Lynx from "./Lynx.js";
import { typeout } from "./typeout.js";

function Section() {}

new Lynx.Page()
  .Header({
    children: new Lynx.ElementChain()
      .H1({
        attributes: new Lynx.AttrChain()
          .Text("Hello, World!")
          .Immediate((element) => {
            console.log("hello?");
            typeout("Hello, World!", 100, (text) => {
              element.textContent = text;
              console.log(text);
            });
          }),
      })
      .Nav({
        children: new Lynx.ElementChain()
          .A({
            attributes: new Lynx.AttrChain()
              .Text("About me")
              .HREF("#about")
              .Class("link"),
          })
          .A({
            attributes: new Lynx.AttrChain()
              .Text("My projects")
              .HREF("#projects")
              .Class("link"),
          })
          .A({
            attributes: new Lynx.AttrChain()
              .Text("About the site")
              .HREF("#site")
              .Class("link"),
          })
          .A({
            attributes: new Lynx.AttrChain()
              .Text("Home")
              .HREF("#")
              .Class("link"),
          }),
      }),
  })
  .Main({
    children: new Lynx.ElementChain().Section({
      attributes: new Lynx.AttrChain().ID("about"),
      children: new Lynx.Solo({
        element: "article",
        children: new Lynx.ElementChain()
          .H2({
            attributes: new Lynx.AttrChain().Text("About me:"),
          })
          .P({
            children: new Lynx.ElementChain()
              .Text(
                `Most people call me rats. If you have something else to call me, you already know that. I've been programming for around ${
                  new Date().getFullYear() - 2020
                } years now. For more about what I've done with that time, check out `
              )
              .A({
                attributes: new Lynx.AttrChain()
                  .HREF("#projects")
                  .Text("my projects")
                  .Class("link"),
              })
              .Text("."),
          })
          .P({
            attributes: new Lynx.AttrChain()
              .Class("comment")
              .Text("//TODO: Expand this"),
          })
          .P({
            attributes: new Lynx.AttrChain()
              .Class("comment")
              .Text("//TODO: Start caring about TODOs"),
          }),
      }),
    }),
  })
  .render();
