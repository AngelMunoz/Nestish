import type { Request } from "express";
import { Controller, Get, Logger, Req } from "@nestjs/common";
import { html } from "@lit-labs/ssr";
import { Layout } from "./views/layout";
import { toReadable } from "./responses";

type ActiveTab = "Home" | "About" | "LogIn";

function isActiveTab(currentTab: ActiveTab, activeTab: ActiveTab) {
  switch (currentTab) {
    case "Home":
      return activeTab === "Home" ? "is-active" : "";
    case "About":
      return activeTab === "About" ? "is-active" : "";
    case "LogIn":
      return activeTab === "LogIn" ? "is-active" : "";
  }
}

function Header(activeTab: ActiveTab, isAuthenticated?: boolean) {
  const lastTab = isAuthenticated
    ? html`<a hx-disable href="/tickets">Tickets</a>`
    : html`<a
        hx-disable
        class="${isActiveTab("LogIn", activeTab)}"
        href="/auth/login"
        >Log in</a
      >`;
  return html`<div class="tabs is-fullwidth">
    <ul hx-boost="true">
      <li class="${isActiveTab("Home", activeTab)}">
        <a href="/">Home</a>
      </li>
      <li class="${isActiveTab("About", activeTab)}">
        <a href="/about">About</a>
      </li>
      <li>${lastTab}</li>
    </ul>
  </div>`;
}

@Controller()
export class AppController {
  constructor(private readonly logger: Logger) {}
  @Get()
  index(@Req() req: Request) {
    this.logger.log("Navigate to Index", AppController.name);
    const isBoosted = req.get("Hx-Boosted") === "true";

    const content = Layout(
      { isPartial: isBoosted, title: "Home" },
      html`<section class="hero is-fullheight">
        <div class="hero-head">${Header("Home")}</div>
        <div class="hero-body">
          <div class="container">
            <p class="title">Nesto</p>
            <p class="subtitle">A NestJS + htmx demo</p>
          </div>
        </div>
      </section>`
    );
    return toReadable(content);
  }

  @Get("/about")
  about(@Req() req: Request) {
    this.logger.log("Navigate to About", AppController.name);

    const isBoosted = req.get("Hx-Boosted") === "true";

    const content = Layout(
      { title: "About", isPartial: isBoosted },
      html`<section class="hero is-fullheight">
        <div class="hero-head">${Header("About")}</div>
        <div class="hero-body">
          <div class="container">
            <p class="title">About</p>
            <p class="subtitle">It is an About thing.</p>
          </div>
        </div>
      </section>`
    );

    return toReadable(content);
  }
}
