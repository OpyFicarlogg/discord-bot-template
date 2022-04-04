// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { DiscordMock} from "../../../helpers/discordMock";

import 'jest';
import Ping from "services/messages/impl/ping";



describe('ping message', () => {
    let instance: Ping;
    const discordMock = new DiscordMock();

    beforeEach(() => {       
        instance = new Ping();  
    });

    it('should return pong', async () => {
        discordMock.getMockMessage().reply = jest.fn().mockImplementation(() => Promise.resolve());

        instance.execute(discordMock.getMockClient(),discordMock.getMockMessage());

        expect(discordMock.getMockMessage().reply).toBeCalledWith("pong!");

        setTimeout(() => { expect(global.console.log).toBeCalled();}, 100);
        
    });

    it('should call console error on reply', async () => {
        discordMock.getMockMessage().reply = jest.fn().mockImplementation(() => Promise.reject());
        
        instance.execute(discordMock.getMockClient(),discordMock.getMockMessage());

        expect(discordMock.getMockMessage().reply).toBeCalledWith("pong!");

        setTimeout(() => { expect(global.console.error).toBeCalled();}, 100);
        
    });

    it('should return name of the message ', async () => {
        expect(instance.getName()).toBe("ping");
    });

});