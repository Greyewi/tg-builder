import { TgBuilder, CommandBuilder, ActionBuilder, BotsLoader, BotDataManager } from '../src'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from "dotenv"

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

jest.mock('fs')
jest.mock('path')

describe('TgBuilder class', () => {
  let tgBuilder: TgBuilder

  beforeEach(() => {
    tgBuilder = new TgBuilder()
  })

  it('should create TgBuilder instance', () => {
    expect(tgBuilder).toBeInstanceOf(TgBuilder)
  })

  // TODO: Add more tests based on the behavior of the class...
})

describe('CommandBuilder class', () => {
  let commandBuilder: CommandBuilder

  beforeEach(() => {
    commandBuilder = new CommandBuilder('botName')
  })

  it('should create CommandBuilder instance', () => {
    expect(commandBuilder).toBeInstanceOf(CommandBuilder)
  })

  // TODO: add more tests based on the behavior of the class...
})

describe('ActionBuilder class', () => {
  let actionBuilder: ActionBuilder

  beforeEach(() => {
    actionBuilder = new ActionBuilder('botName')
  })

  it('should create ActionBuilder instance', () => {
    expect(actionBuilder).toBeInstanceOf(ActionBuilder)
  })

  // TODO: add more tests based on the behavior of the class...
})

describe('BotsLoader class', () => {
  let botsLoader: BotsLoader

  beforeEach(() => {
    botsLoader = new BotsLoader(undefined, {
      bots: [
        {
          token: 'some token',
          name: 'mock-bot',
        },
      ],
    })
  });

  it('should create BotsLoader instance', () => {
    expect(botsLoader).toBeInstanceOf(BotsLoader)
  })

  it('should correctly load bots', () => {
    const mockCommandBuilder = jest
      .fn()
      .mockReturnValue(new CommandBuilder('mock-bot'))
    const mockActionBuilder = jest
      .fn()
      .mockReturnValue(new ActionBuilder('mock-bot'))

    botsLoader.addBot('mock-bot', mockCommandBuilder, mockActionBuilder)

    expect(botsLoader.builders).toHaveLength(1)
    expect(botsLoader.builders[0]).toBeInstanceOf(TgBuilder)
  })

  // TODO: add more tests based on the behavior of the class...
})


describe('BotDataManager class', () => {
  let manager: BotDataManager;

  beforeEach(() => {
    manager = new BotDataManager();

    // Reset mocks
    (path.resolve as jest.MockedFunction<typeof path.resolve>).mockClear();
    (fs.existsSync as jest.MockedFunction<typeof fs.existsSync>).mockClear();
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockClear();
    (fs.writeFileSync as jest.MockedFunction<typeof fs.writeFileSync>).mockClear();
  });

  it('loads bot data from existing file', () => {
    (path.resolve as jest.MockedFunction<typeof path.resolve>).mockReturnValue('mocked/path/tg.json');
    (fs.existsSync as jest.MockedFunction<typeof fs.existsSync>).mockReturnValue(true);
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValue('{"bots": [{"token": "mock-token", "name": "mock-bot"}]}');

    manager.loadBotData();

    expect(manager.botData).toEqual({ bots: [{ token: 'mock-token', name: 'mock-bot' }] });
  });

  it('uses default bot data and saves it when file does not exist', () => {
    (path.resolve as jest.MockedFunction<typeof path.resolve>).mockReturnValue('mocked/path/tg.json');
    (fs.existsSync as jest.MockedFunction<typeof fs.existsSync>).mockReturnValue(false);

    manager.loadBotData();

    expect(manager.botData).toEqual({ bots: [] });
    expect(fs.writeFileSync).toHaveBeenCalled();  // Check if the save function was called
  });

  it('saves bot data to file', () => {
    manager.botData = { bots: [{ token: 'test-token', name: 'test-bot' }] };

    (path.resolve as jest.MockedFunction<typeof path.resolve>).mockReturnValue('mocked/path/tg.json');

    manager.saveBotData('mocked/path/tg.json');

    expect(fs.writeFileSync).toHaveBeenCalledWith('mocked/path/tg.json', JSON.stringify(manager.botData, null, 2), 'utf-8');
  });
});