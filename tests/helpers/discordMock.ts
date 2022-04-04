import { Client, Collection, CommandInteraction, CommandInteractionOptionResolver, Guild, GuildMember, Message, Snowflake, User, UserManager, VoiceBasedChannel, VoiceState } from "discord.js";
import { RawInteractionData, RawUserData } from "discord.js/typings/rawDataTypes";
import createMockInstance from "jest-create-mock-instance";
//This class allow to mock different objets of discordjs.
//Other possibility to mock discordjs https://dev.to/heymarkkop/how-to-implement-test-and-mock-discordjs-v13-slash-commands-with-typescript-22lc
class MockCommandInteraction extends CommandInteraction {
    constructor(client : Client, raw : RawInteractionData){
        super(client, raw);
    }
}

class MockUser extends User {
    constructor(client : Client, raw : RawUserData){
        super(client, raw);
    }
}

export class DiscordMock{
    private mockedCommandInteraction! : jest.Mocked<CommandInteraction>;
    private mockedUser! : jest.Mocked<User> 
    private mockedClient! : jest.Mocked<Client>;
    private mockedMessage! : jest.Mocked<Message>;
    private mockedGuild! : jest.Mocked<Guild>;
    private mockedNewVoiceState! : jest.Mocked<VoiceState>;
    private mockedOldVoiceState! : jest.Mocked<VoiceState>;
    private static readonly GUILDID : string = "abc";
    constructor(){
        this.mockClient();
        this.mockUser();
        this.mockCommand();
        this.mockGuild();
        this.mockMessage();
        this.mockNewVoiceState();
        this.mockOldVoiceState();
    }

    private mockClient() {
        let userManager = {} as jest.Mocked<UserManager>;
        //Mock by default the method fetch to return a user 
        userManager.fetch = jest.fn().mockImplementation(() => Promise.resolve(this.getMockUser()));

        this.mockedClient =  createMockInstance(Client);
        this.mockedClient.users = userManager;
    }

    private mockUser() {
        this.mockedUser = createMockInstance(MockUser);
        this.mockedUser.id = "12";
        this.mockedUser.username = "test";
        this.mockedUser.bot= false;
    }


    //type assertion hack https://stackoverflow.com/questions/54510245/mocking-stubbing-a-typescript-interface-with-jest
    // Other solution: https://dev.to/heymarkkop/how-to-implement-test-and-mock-discordjs-v13-slash-commands-with-typescript-22lc?signin=true  
    // create private constructor private with prototype https://stackoverflow.com/questions/60530831/mock-typescript-class-with-private-constructor-using-jest
    // mock private method https://stackoverflow.com/questions/63587868/how-can-i-mock-a-private-property-in-a-class-im-trying-to-test-in-jest 
    // Internal class https://stackoverflow.com/questions/65687036/accessing-a-private-constructor

    private mockCommand(){
        this.mockedCommandInteraction  = createMockInstance(MockCommandInteraction);
        let mockedOptions = {} as jest.Mocked<CommandInteractionOptionResolver>;
        this.mockedCommandInteraction.options = mockedOptions;
        this.mockedCommandInteraction.guildId =DiscordMock.GUILDID;
        this.mockedCommandInteraction.user = this.mockedUser;
    }

    private mockGuild(){
        this.mockedGuild = {}  as jest.Mocked<Guild>;
        this.mockedGuild.id = DiscordMock.GUILDID;
    }

    private mockMessage(){
        this.mockedMessage = {}  as jest.Mocked<Message>;
        this.mockedMessage.author = this.mockedUser;
        //Allow to set a private/protected method 
        Reflect.set(this.mockedMessage, 'guild',this.mockedGuild);
        this.mockedMessage.reply = jest.fn();
    }

    private mockNewVoiceState(){
        this.mockedNewVoiceState = {}  as jest.Mocked<VoiceState>;
        //voice channel creation
        let voiceChannel = {} as VoiceBasedChannel;
        Reflect.set(voiceChannel, 'members',new Collection<Snowflake, GuildMember>());
        voiceChannel.members.set("1",this.newMockGuildMember());
        voiceChannel.name= "test";

        this.mockedNewVoiceState.guild = this.getMockGuild();
        Reflect.set(this.mockedNewVoiceState, 'channel',voiceChannel);
        Reflect.set(this.mockedNewVoiceState, 'member',this.newMockGuildMember());
    }

    private mockOldVoiceState(){
        this.mockedOldVoiceState = {}  as jest.Mocked<VoiceState>;
        Reflect.set(this.mockedOldVoiceState, 'channel',null);
        Reflect.set(this.mockedOldVoiceState, 'member',this.newMockGuildMember());
    }



    
    public getMockClient() : jest.Mocked<Client>{
        return this.mockedClient;
    }

    public getMockUser() : jest.Mocked<User>{
        return this.mockedUser;
    }

    public getMockCommandInteraction() : jest.Mocked<CommandInteraction>{
        return this.mockedCommandInteraction;
    }

    public getMockMessage() : jest.Mocked<Message>{
        return this.mockedMessage;
    }

    public getMockGuild() : jest.Mocked<Guild>{
        return this.mockedGuild;
    }

    public getMockNewVoiceState() : jest.Mocked<VoiceState>{
        return this.mockedNewVoiceState;
    }

    public getMockOldVoiceState() : jest.Mocked<VoiceState>{
        return this.mockedOldVoiceState;
    }

    public newMockGuildMember() : jest.Mocked<GuildMember> {
        let guildMember = {}  as jest.Mocked<GuildMember>;
        guildMember.user = this.getMockUser();
        return guildMember;
      }
}
       
