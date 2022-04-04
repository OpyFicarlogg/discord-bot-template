
import { Container } from "inversify";
import path from "path";
import { readdirSync } from "fs";

import { DYNAMIC_LOAD, LOAD_TYPES, TYPES } from "./types";

import { AbstractMessage } from "dto/abstractMessage";
import { AbstractCommand } from "dto/abstractCommand";

import { ICustomStateUpdate } from "services/stateUpdate/interfaces/ICustomStateUpdate";
import { CustomStateUpdate } from "services/stateUpdate/customStateUpdate";
import { Loader } from "services/loader";

//.toSelf() without interface
const myContainer = new Container({ defaultScope: "Singleton" });
//Link an interface to a class
myContainer.bind<ICustomStateUpdate>(TYPES.ICustomStateUpdate).to(CustomStateUpdate);
myContainer.bind<Loader>(Loader).toSelf();
//Load dynamic
loader<AbstractCommand>(LOAD_TYPES.command);
loader<AbstractMessage>(LOAD_TYPES.message);


  //set dependency injection for commands
function loader<Type>( folder : string)  {

  let symbolMap = new Map<string,symbol>();
  const patho : string = path.join(process.cwd(),"src","services", folder, "impl");

  let files = readdirSync(patho)
    .filter((file) => file.endsWith('.ts'));  
    for(var i = 0; i < files.length ; i++) {
      //import dynamic 
      let imported = require(`${patho}/${files[i]}`);
      //Add in the symbols list for dependency injection
      let symbol = Symbol(files[i]);
      symbolMap.set(files[i],symbol);
      myContainer.bind<Type>(symbol).to(imported.default);
    }
    DYNAMIC_LOAD.set(folder,symbolMap);
  }

export { myContainer };