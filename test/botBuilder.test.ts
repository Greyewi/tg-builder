import { Telegraf } from 'telegraf'
import { TgBuilder, CommandBuilder, ActionBuilder, BotsLoader } from '../src'

// Mock the LowSync and JSONFileSync for the BotsLoader class.
jest.mock('lowdb/node', () => ({
  JSONFileSync: jest.fn().mockImplementation(() => ({
    read: jest.fn().mockImplementation(function (this: any) {
      this.data = { bots: [{ token: 'mock-token', name: 'mock-bot' }] }
    }),
  })),
}))

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
  })

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
