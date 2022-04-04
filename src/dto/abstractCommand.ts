import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, Message } from "discord.js";
import { injectable } from "inversify";
import { Command } from "services/commands/interfaces/command";
import { ToLoad } from "./toLoad";

//All slash commands must implement this abstract class
@injectable()
export abstract class AbstractCommand implements ToLoad, Command {
    protected cmdName: string = '';

    public getName(){
        return this.cmdName;
    }

    abstract execute(client : Client, interaction : CommandInteraction, args?: string []) : void

    abstract getSlashCommand() : SlashCommandBuilder
}