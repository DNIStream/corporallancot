'use strict';

const MessageResolverBase = require("./messageResolverBase");
var theoretically = require("jasmine-theories");

describe("messageResolverBase", () => {
  theoretically.it("throws error if message is '%s' (not a string)", [null, "", " ", undefined], (insertedValue) => {
    const resolver = new MessageResolverBase();
    expect(() => { resolver.resolveChatMessage(insertedValue) }).toThrowError("'message' is required");
  });

  it("sets command to empty string when command not found", () => {
    const message = "this is a message without a command";
    const action = new MessageResolverBase().resolveChatMessage(message);
    expect(action.command).toBe("");
  });

  it("sets command to passed command string without bang when command found", () => {
    const message = "!mycommand";
    const action = new MessageResolverBase().resolveChatMessage(message);
    expect(action.command).toBe("mycommand");
  });

  it("sets isBangCommand to true when bang found in message", () => {
    const message = "!mycommand";
    const action = new MessageResolverBase().resolveChatMessage(message);
    expect(action.isBangCommand).toBeTrue();
  });

  it("sets command to lowercase command string when command found", () => {
    const message = "!MYCommanD";
    const action = new MessageResolverBase().resolveChatMessage(message);
    expect(action.command).toBe("mycommand");
  });

  it("strips spaces from command string when command found", () => {
    const message = "!mycommand  ";
    const action = new MessageResolverBase().resolveChatMessage(message);
    expect(action.command).toBe("mycommand");
  });

  it("sets data to empty string when command found without data", () => {
    const message = "!commandwithoutdata";
    const action = new MessageResolverBase().resolveChatMessage(message);
    expect(action.data).toBe("");
  });

  it("sets data to expected data string when command found with data", () => {
    const message = "!jeffscommand jeff is a";
    const action = new MessageResolverBase().resolveChatMessage(message);
    expect(action.data).toBe("jeff is a");
  });

  it("sets data to full input message when no bang command found", () => {
    const message = "jeff is a lovely person";
    const action = new MessageResolverBase().resolveChatMessage(message);
    expect(action.data).toBe(message);
  });

  it("sets isBangCommand to false when no bang command found in message", () => {
    const message = "jeff is a lovely person";
    const action = new MessageResolverBase().resolveChatMessage(message);
    expect(action.isBangCommand).toBeFalse();
  });
});
