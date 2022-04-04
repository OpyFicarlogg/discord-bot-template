import { Client, Message } from "discord.js";

//Interface used in the abstract slash command and message command
export interface CustomMessage {
  
    execute(client : Client, message : Message) : void;
}