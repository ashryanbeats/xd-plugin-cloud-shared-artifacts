/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

const { Rectangle, Color } = require("scenegraph");
const cloud = require("cloud");
const xdPluginToolkit = require("./lib/dialogs.js");

async function myPluginCommand(selection) {
  // Go to Plugins > Development > Developer Console to see this log output
  console.log("Plugin command is running!");

  const sharedArtifacts = cloud.getSharedArtifacts();
  console.log(sharedArtifacts);

  const msgData = [];

  sharedArtifacts.map(artifact => {
    msgData.push(`# Name: ${artifact.name}`);
    msgData.push(`* Type: ${artifact.type}`);
    msgData.push(`* Target Platform: ${artifact.targetPlatform}`);
    msgData.push(`[View on the web](${artifact.url})`);
  });

  console.log(msgData);

  let dialogContent = {
    title: "Shared Artifacts",
    icon: "plugin-icon",
    msgs: msgData,
    isError: false,
    width: 600,
    height: "auto",
    iconSize: 18
  };

  await xdPluginToolkit.createDialog(dialogContent);
}

module.exports = {
  commands: {
    myPluginCommand: myPluginCommand
  }
};
