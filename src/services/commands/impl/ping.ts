import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { AbstractCommand } from "dto/abstractCommand";

export default class Ping extends AbstractCommand {

    constructor(){
        super();
        super.cmdName = 'ping'
    }
   
    // processing of a slash command 
    public execute(client : Client, interaction : CommandInteraction, args?: string []) : void {
        interaction.reply({
			content: 'pong!',
			ephemeral : true,
		});
    }

    //Definition of the slash command 
    public getSlashCommand() : SlashCommandBuilder {
        return  new SlashCommandBuilder()
        .setName(this.cmdName)
        .setDescription("this is a ping command") ;
    }
}







/*export const data : SlashCommandBuilder = new SlashCommandBuilder()
.setName('ping')
.setDescription('Replies with Pong!');

export async function execute (interaction : CommandInteraction) {
    await interaction.reply('Pong!');
}*/