import { VoiceState, Client } from "discord.js";
import { injectable } from "inversify";
import { ICustomStateUpdate } from "./interfaces/ICustomStateUpdate";

// This class allow to interact when user leave or join a channel.
@injectable()
export class CustomStateUpdate implements ICustomStateUpdate{

    public constructor(){
    }
    
    public execute(client : Client,oldState: VoiceState, newState : VoiceState) {
        this.notifyUsers(client,oldState,newState);
    }

    private notifyUsers(client : Client,oldState: VoiceState, newState : VoiceState){
        if(this.detectNewUser(oldState,newState)){

            //Send a direct message to the connected user 
            newState.member?.user.send(`${newState.channel!.members.size} dans le channel ${newState.channel!.name}`);
        }
    }

    private detectNewUser(oldState: VoiceState, newState :VoiceState) : boolean{
        // check for bot
        if (oldState.member!.user.bot) return false;
    
        //get channels
        let newUserChannel = newState.channel;
        let oldUserChannel = oldState.channel;
      
        // User Joins a voice channel
        if(!oldUserChannel && newUserChannel) {
            console.log(`Nouvel utilisateur connecté: ${newState.member!.user.username}`);
            return true;       
        } else if(!newUserChannel){
            // User leaves a voice channel
          return false;
        }
        return false;
    }
}
