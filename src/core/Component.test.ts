import { Component, TEventResult } from "./Component";
import { expect } from "chai";

describe("COMPONENT TESTING", () => {
  const testComponent = new Component();
  it("render", () => {
    testComponent.view = () => `Hello from component`;
    testComponent.render();
    expect(testComponent.innerHTML).to.eq("Hello from component");
  });

  it("setting props", () => {
    testComponent.props.name = "Component";
    expect(testComponent.props.name).to.eq("Component");
  });

  it("setting and work events", () => {
    let eventResult = "";
    const event = (res: TEventResult) => {
      eventResult = res.detail.toString();
    };
    testComponent.setEvent("test", event);
    testComponent.testEvent("test", "check event");
    expect(eventResult).to.eq("check event");
  });
});
