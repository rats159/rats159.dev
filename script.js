import * as Lynx from "./Lynx.js";

new Lynx.Page()
  .Button(
    new Lynx.AttrChain()
      .Text("Click me!")
      .Class("lilly")
      .OnClick((element) => {
        const ripple = document.createElement("div");
        ripple.classList.add("ripple");
        element.appendChild(ripple);
        setTimeout(() => {
          ripple.remove();
        }, 1500);
      })
  )
  .render();
