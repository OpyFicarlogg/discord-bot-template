// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { Client, User } from "discord.js";
import { DiscordMock} from "../../../helpers/discordMock";
import { SlashCommandBuilder } from '@discordjs/builders';

import 'jest';
import createMockInstance from "jest-create-mock-instance";
import Example from "services/commands/impl/example";



describe('ping commands', () => {
    const discordMock = new DiscordMock();
    let instance: Example;
    const usr : User = discordMock.getMockUser();
    const commandInteraction = discordMock.getMockCommandInteraction();
    const cli : jest.Mocked<Client>= createMockInstance(Client);

    beforeEach(() => {       
        instance = new Example();  
    });


    it('should return default message', async () => {
        commandInteraction.options.getString  = jest.fn().mockReturnValueOnce(null);
        commandInteraction.options.getUser = jest.fn().mockReturnValueOnce(usr);
 
        instance.execute(cli,commandInteraction);

        expect(commandInteraction.options.getString).toBeCalled();
        expect(commandInteraction.options.getUser).toBeCalled();

        expect(commandInteraction.reply).toBeCalledWith(`pouch ${usr}`);
    });

    it('should return overriden message', async () => {
        commandInteraction.options.getString  = jest.fn().mockReturnValueOnce("test");
        commandInteraction.options.getUser = jest.fn().mockReturnValueOnce(usr);
 
        instance.execute(cli,commandInteraction);

        expect(commandInteraction.options.getString).toBeCalled();
        expect(commandInteraction.options.getUser).toBeCalled();

        expect(commandInteraction.reply).toBeCalledWith(`test ${usr}`);
    });

    it('should return name of the command ', async () => {
        expect(instance.getName()).toBe("example");
    });

    it('should return the definition of the command', async () => {
        let result : SlashCommandBuilder = instance.getSlashCommand();
        expect(result).toBeInstanceOf(SlashCommandBuilder);
        expect(result).not.toBeNull();
        expect(result).toBeDefined();
    });
});