import { Client, VoiceState } from "discord.js";

export interface ICustomStateUpdate {

    execute(client : Client,oldState: VoiceState, newState : VoiceState) : void;
}


