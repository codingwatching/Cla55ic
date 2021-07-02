const fs = require('fs');
const config = require('../../config.json');

module.exports = (server, client, args) => {
  if (config.ops.includes(client.username)) {
    if (args.length === 1) {
      if (!config.ops.includes(args[0])) {
        client.write('message', {
          player_id: 0,
          message: `Opped ${args[0]}`,
        });

        config.ops.push(args[0]);

        // NOTE: For some reason, you cannot use ../../ here, it uses the place where server.js
        fs.writeFileSync('config.json', JSON.stringify(config, null, '\t'));
      } else {
        client.write('message', {
          player_id: 0,
          message: 'Player is already opped.',
        });
      }
    } else {
      client.write('message', {
        player_id: 0,
        message: 'Missing argument.',
      });
    }
  } else {
    client.write('message', {
      player_id: 0,
      message: 'You are not opped.',
    });
  }
};
