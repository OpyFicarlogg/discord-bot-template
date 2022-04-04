import { Client, CommandInteraction, User } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { AbstractCommand } from "dto/abstractCommand";

export default class Example extends AbstractCommand {

    private static readonly MESSAGE : string = 'message';
    private static readonly USER : string = 'user';

    constructor(){
        super();
        super.cmdName = 'example'
    }

    public execute(client : Client, interaction : CommandInteraction, args?: string []) : void {
        let message: string | null = interaction.options.getString(Example.MESSAGE);
        let user: User = interaction.options.getUser(Example.USER)!;

        if(!message){
            message = "pouch";
        }
        interaction.reply(`${message} ${user}`);
    }

    public getSlashCommand() : SlashCommandBuilder {
         //Params https://discordjs.guide/interactions/registering-slash-commands.html#options
         const data : SlashCommandBuilder= new SlashCommandBuilder()
         .setName(this.cmdName)
         .setDescription("Slash command exemple");

         data.addUserOption(option =>
            option.setName(Example.USER)
                .setDescription('Set the user in the reply')
                .setRequired(true)
            );

         data.addStringOption(option =>
             option.setName(Example.MESSAGE)
                 .setDescription("Override the reply message")
             );
         
     return data;
    }
} 