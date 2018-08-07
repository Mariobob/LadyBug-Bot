const { Client } = require("klasa");
const perms = require("./utils/permissionLevels.js");
const Constants = require("./utils/Constants.js");
const IdioticAPI = require("idiotic-api");
const RawEventStore = require("./stores/RawEventStore.js");

class LadybugClient extends Client {
  constructor() {
    super({
      fetchAllMembers: false,
      permissionLevels: perms,
      prefix: "lb!",
      regexPrefix: /(hey\s*)?ladybug,?\s*/i,
      providers: { default: "mongodb", mongodb: { url: process.env.MONGODB, db: "ladybug", options: { useNewUrlParser: true } } },
      commandEditing: true,
      pieceDefaults: {
        commands: { deletable: true },
        rawEvents: { enabled: true }
      },
      typing: true,
      ownerID: "292690616285134850",
      readyMessage: (client) => `Successfully initialized. Logged in as ${client.user.tag} (${client.user.id}), Ready to serve ${client.users.size} users in ${client.guilds.size} guilds with ${client.channels.size} channels!`,
      commandLogging: true
    });
    this.commandsRan = 0;
    this.idioticapi = new IdioticAPI.Client(process.env.IDIOTICAPI, { dev: true });
    this.rawEvents = new RawEventStore(this);
    this.registerStore(this.rawEvents);
    this.constants = Constants;
  }
  
  login() {
    return super.login(process.env.TOKEN);
  }
}

const client = new LadybugClient();
client.login();