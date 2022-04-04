// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { Intents,Client } from "discord.js";

import { myContainer } from "config/inversify.config";
import { TYPES } from "config/types";

import { ICustomStateUpdate } from "services/stateUpdate/interfaces/ICustomStateUpdate";
import { Loader } from "services/loader";
import { AbstractMessage } from "dto/abstractMessage";
import { AbstractCommand } from "dto/abstractCommand";

//Dependency injection 
const customStateUpdate : ICustomStateUpdate = myContainer.get<ICustomStateUpdate>(TYPES.ICustomStateUpdate);
const loader = myContainer.get<Loader>(Loader);
//Intents.FLAGS.GUILD_VOICE_STATES pour voiceStateUpdate
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES ] });

let commands = new Map<string,AbstractCommand>();
let messages = new Map<string,AbstractMessage>();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user!.tag}!`);

	//Load all slashcommands
	commands = loader.loadCommands();
	//Load all message commands 
	messages = loader.loadMessages();
});

//Users slash commands
client.on('interactionCreate', async interaction => {
	console.log(interaction)
	if (!interaction.isCommand()) return;

	if(commands.get(interaction.commandName)){
		commands.get(interaction.commandName)?.execute(client,interaction);
	}
});

//Users messages
client.on('messageCreate', msg => {
	let prefix = '!'; // Default prefix 
	if(msg.content.startsWith(prefix)){
		let command =  msg.content.replace(prefix, '');
		if(messages.get(command)){
			messages.get(command)?.execute(client,msg);
		}
	}
});

//User enter or leave voice channel 
client.on('voiceStateUpdate', (oldState, newState) => {
    customStateUpdate.execute(client,oldState,newState);
})


client.login(process.env.DISCORD_TOKEN!);
