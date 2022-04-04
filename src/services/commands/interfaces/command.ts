import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

//Interface used in the abstract slash command and message command
export interface Command {
  
    execute(client : Client, interaction : CommandInteraction, args?: string []) : void;

    getSlashCommand() : SlashCommandBuilder;
}