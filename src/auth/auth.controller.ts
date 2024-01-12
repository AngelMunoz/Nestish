import { Controller, Get } from "@nestjs/common";
import { html } from "@lit-labs/ssr";
import { toReadable } from "../responses";
import { Layout } from "../views/layout";

@Controller("auth")
export class AuthController {
  @Get("login")
  login() {
    const content = Layout(
      {
        title: "Authentication",
      },
      html`<section class="hero is-fullheight">
        <div class="hero-head">
          <div class="tabs is-fullwidth">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="hero-body"></div>
        <div class="hero-foot">
          <footer class="footer">
            <div class="content has-text-centered">
              <p>
                <strong>Nesto</strong>
              </p>
            </div>
          </footer>
        </div>
      </section>`
    );
    return toReadable(content);
  }
}
