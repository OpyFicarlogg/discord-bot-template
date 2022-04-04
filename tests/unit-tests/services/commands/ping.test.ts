// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { Client } from "discord.js";
import Ping from "services/commands/impl/ping";
import { DiscordMock} from "../../../helpers/discordMock";
import { SlashCommandBuilder } from '@discordjs/builders';

import 'jest';
import createMockInstance from "jest-create-mock-instance";



describe('ping commands', () => {
    const discordMock = new DiscordMock();
    let instance: Ping;
    const commandInteraction = discordMock.getMockCommandInteraction();
    const cli : jest.Mocked<Client>= createMockInstance(Client);

    beforeEach(() => {       
        instance = new Ping();  
    });

    it('should get data from file', async () => {
        instance.execute(cli,commandInteraction);

        expect(commandInteraction.reply).toBeCalled();

        expect(commandInteraction.reply).toBeCalledWith({
			content: 'pong!',
			ephemeral : true,
		});
    });

    it('should return name of the command ', async () => {
        expect(instance.getName()).toBe("ping");
    });

    it('should return the definition of the command', async () => {
        let result : SlashCommandBuilder = instance.getSlashCommand();
        expect(result).toBeInstanceOf(SlashCommandBuilder);
        expect(result).not.toBeNull();
        expect(result).toBeDefined();
    });
});