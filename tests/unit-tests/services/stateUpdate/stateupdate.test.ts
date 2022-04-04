// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { DiscordMock} from "../../../helpers/discordMock";

import 'jest';
import { CustomStateUpdate } from "services/stateUpdate/customStateUpdate";
import { VoiceState } from "discord.js";


describe('custom stateUpdate', () => {
    let instance: CustomStateUpdate;
    let discordMock : DiscordMock;
    let newVoiceState : VoiceState;

    beforeEach(() => {    
        instance = new CustomStateUpdate();  
        discordMock = new DiscordMock();
        newVoiceState = discordMock.getMockNewVoiceState();
    });

    it('Should send the notification to the new user ', async () => {

        instance.execute(discordMock.getMockClient(),discordMock.getMockOldVoiceState(), newVoiceState)

        setTimeout(() => { 
            expect(discordMock.getMockUser().send).toBeCalledWith(`${newVoiceState.channel!.members.size} dans le channel ${newVoiceState.channel!.name}`);
        }, 100);
        
    });


    it('Should not send the notification to the user because a bot joined', async () => {

        let oldVoice = discordMock.getMockOldVoiceState();
        oldVoice.member!.user.bot = true;
        instance.execute(discordMock.getMockClient(),oldVoice, discordMock.getMockNewVoiceState())

        expect(discordMock.getMockUser().send).not.toBeCalled();
        
    });

    it('Should not send the notification because a user leaved', async () => {

        instance.execute(discordMock.getMockClient(),discordMock.getMockNewVoiceState(), discordMock.getMockOldVoiceState())
        
        expect(discordMock.getMockUser().send).not.toBeCalled();
        
    });

});
