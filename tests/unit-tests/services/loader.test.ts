// Run dotenv
require('dotenv').config();
import "reflect-metadata";
import 'jest';

import { myContainer } from "config/inversify.config";
import { Loader } from "services/loader";
import { AbstractMessage } from "dto/abstractMessage";
import { AbstractCommand } from "dto/abstractCommand";


describe('loader handler', () => {
    let commands = new Map<string,AbstractCommand>();
    let messages = new Map<string,AbstractMessage>();

    it('should load all classes from commands and messages', async () => {
        const loader = myContainer.get<Loader>(Loader);

        commands = loader.loadCommands();
        messages = loader.loadMessages();

        expect(commands.size).toBeGreaterThan(0);
        expect(messages.size).toBeGreaterThan(0);
    });

});
