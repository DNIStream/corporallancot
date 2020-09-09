'use strict';

const ActionHandlerResolver = require("@actionHandlers/actionHandlerResolver");
const faker = require('faker');

describe("actionHandlerResolver", () => {
  let logger;

  beforeEach(() => {
    logger = jasmine.createSpyObj("logger", ["log"]);
  });

  it("maps injected actions to actions property", () => {
    // Arrange
    const actions = [
      {}, {}
    ];

    // Act
    const resolver = new ActionHandlerResolver({ logger, actions });

    // Assert
    expect(resolver.actions).toBe(actions);
  });

  it("maps injected logger to logger property", () => {
    // Act
    const resolver = new ActionHandlerResolver({ logger });

    // Assert
    expect(resolver.logger).toBe(logger);
  });

  it("resolve returns generic action handler if isBangCommand is false", async () => {
    // Arrange
    const actionHandlerMessage = jasmine.createSpyObj("actionHandlerMessage", null, {
      isBangCommand: false,
      command: "generic"
    });
    const genericActionHandler = jasmine.createSpyObj("genericActionHandler", null, {
      name: "generic"
    });
    const actions = [
      genericActionHandler
    ];
    const resolver = new ActionHandlerResolver({ logger, actions });

    // Act
    const resolvedAction = await resolver.resolve(actionHandlerMessage)

    // Assert
    expect(resolvedAction).toBe(genericActionHandler);
  });

  it("resolve returns action handler specified in command if isBangCommand is true", async () => {
    // Arrange
    const actionHandlerMessage = jasmine.createSpyObj("actionHandlerMessage", null, {
      isBangCommand: true,
      command: "notes"
    });
    const notesActionHandler = jasmine.createSpyObj("notesActionHandler", null, {
      name: "notes"
    });

    const actions = [
      notesActionHandler
    ];
    const resolver = new ActionHandlerResolver({ logger, actions });

    // Act
    const resolvedAction = await resolver.resolve(actionHandlerMessage)

    // Assert
    expect(resolvedAction).toBe(notesActionHandler);
  });

  it("resolve returns rejected promise if isBangCommand is true and command is generic", async () => {
    // Arrange
    const actionHandlerMessage = jasmine.createSpyObj("actionHandlerMessage", null, {
      isBangCommand: true,
      command: "generic"
    });
    const genericActionHandler = jasmine.createSpyObj("genericActionHandler", null, {
      name: "generic"
    });
    const actions = [
      genericActionHandler
    ];
    const resolver = new ActionHandlerResolver({ logger, actions });

    // Act & Assert
    await expectAsync(resolver.resolve(actionHandlerMessage))
      .toBeRejectedWithError("The generic action handler cannot be resolved with a bang command");
  });

  it("resolve returns generic action handler when isBangCommand is true and action handler does not exist", async () => {
    // Arrange
    const actionHandlerMessage = jasmine.createSpyObj("actionHandlerMessage", null, {
      isBangCommand: true,
      command: "notavalidaction"
    });
    const genericActionHandler = jasmine.createSpyObj("genericActionHandler", null, {
      name: "generic"
    });
    const actions = [
      genericActionHandler
    ];
    const resolver = new ActionHandlerResolver({ logger, actions });

    // Act
    const resolvedAction = await resolver.resolve(actionHandlerMessage)

    // Assert
    expect(resolvedAction).toBe(genericActionHandler);
  });

  it("resolve rejects promise if generic action handler is not found", async () => {
    // Arrange
    const actionHandlerMessage = jasmine.createSpyObj("actionHandlerMessage", null, {
      isBangCommand: true,
      command: faker.random.word()
    });
    const anotherActionHandler = jasmine.createSpyObj("anotherActionHandler", null, {
      name: "notgeneric"
    });
    const actions = [
      anotherActionHandler
    ];
    const resolver = new ActionHandlerResolver({ logger, actions });

    // Act & Assert
    await expectAsync(resolver.resolve(actionHandlerMessage))
      .toBeRejectedWithError("The generic action handler was not found");
  });

});
