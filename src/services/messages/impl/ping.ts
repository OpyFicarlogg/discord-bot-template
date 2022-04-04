import { Client, Message } from "discord.js";
import { AbstractMessage } from "dto/abstractMessage";

// A classic ping message command to test if the bot is up
export default class Ping extends AbstractMessage {
    
    public constructor(){
        super();
        super.msgName = 'ping';
    }

    public execute(client : Client, message : Message) : void {
        message.reply('pong!')
                .then(() => console.log(`Reply pong to: ${message.author.username}`))
                .catch(console.error);
    }
}

