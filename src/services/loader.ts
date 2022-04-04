import { readdirSync} from "fs";
import { injectable } from "inversify";
import path from "path";
import { ToLoad } from "dto/toLoad";
import { myContainer } from "config/inversify.config";
import { DYNAMIC_LOAD, LOAD_TYPES } from "config/types";
import { AbstractMessage } from "dto/abstractMessage";
import { AbstractCommand } from "dto/abstractCommand";


/* This class allow to load dynamically all Commands and messages in the repertory:
    src/services/commands/impl
    src/services/messages/impl

They will be parsed in the bot.ts or deploy-commands.ts file for every commands or messages from the users
and execute them if needed
*/

@injectable()
export class Loader{

    // Load all commands 
    public loadCommands() {
        return this.load<AbstractCommand>(LOAD_TYPES.command);
    }
    // Load all messages 
    public loadMessages() {
        return this.load<AbstractMessage>(LOAD_TYPES.message);
    }

    //https://www.typescriptlang.org/docs/handbook/2/generics.html
    // Load from a type based on a folder.
    private load<Type>(folder: string)  {
        let retMap : Map<string, Type> = new Map();
        
        const patho : string = path.join(process.cwd(),"src", "services",folder, "impl");
  
        let files = readdirSync(patho)
        .filter((file) => file.endsWith('.ts'));
  
        for(var i = 0; i < files.length ; i++) {
            let symbol = DYNAMIC_LOAD.get(folder)?.get(files[i]);
            if(symbol){
                let cmd : Type = myContainer.get<Type>(symbol);

                if(this.instanceOfToLoad(cmd)){
                    retMap.set(cmd.getName(),cmd);
                }    
            }               
        }
        return retMap ;   
    }

    // Check if the loaded type is instance of ToLoad interface
    private instanceOfToLoad(object: any): object is ToLoad {
        return 'getName'  in object;
    }
}
