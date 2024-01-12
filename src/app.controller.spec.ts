import { describe, beforeEach, it, expect } from "bun:test";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { Logger } from "@nestjs/common";
import { Request } from "express";
import { fromStreamableFileToText } from "./test/utils";

describe("AppController", () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [Logger],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Index", () => {
    it("should contain a full height hero", async () => {
      const result = controller.index({ get(name: string) {} } as Request);
      const textified = await fromStreamableFileToText(result);
      document.documentElement.innerHTML = textified;
      const hero = document.querySelector(".hero.is-fullheight");
      expect(hero).not.toBeNull();
    });

    it("should contain a full document", async () => {
      const result = controller.index({ get(name: string) {} } as Request);
      const textified = await fromStreamableFileToText(result);

      document.documentElement.outerHTML = textified;

      const body = document.querySelector("body");
      const head = document.querySelector("head");
      const title = document.querySelector("title");

      expect(body).not.toBeNull();
      expect(head).not.toBeNull();
      expect(title?.innerText).toBe("Home");
    });

    it("should contain a full height hero only when Xh-Boosted: true", async () => {
      const result = controller.index({
        get(name: string) {
          if (name === "Hx-Boosted") return "true";
        },
      } as Request);
      const textified = await fromStreamableFileToText(result);

      document.body.innerHTML = textified;

      const hero = document.querySelector(".hero.is-fullheight");

      expect(document.body.childElementCount).toBe(1);
      expect(hero).not.toBeNull();
    });
  });
});
