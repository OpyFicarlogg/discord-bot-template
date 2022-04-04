import { Client, Message } from "discord.js";
import { injectable } from "inversify";
import { CustomMessage } from "services/messages/interfaces/customMessage";
import { ToLoad } from "./toLoad";

//All message commands must implement this abstract class
@injectable()
export abstract class AbstractMessage implements ToLoad, CustomMessage {
    protected msgName: string = '';

    public getName(){
        return this.msgName;
    }

    abstract execute(client : Client, message : Message) : void
}