/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

const cloud = require("cloud");
const xdPluginToolkit = require("./lib/dialogs.js");

async function myPluginCommand(selection) {
  // Go to Plugins > Development > Developer Console to see this log output
  console.log("Plugin command is running!");

  const sharedArtifacts = cloud.getSharedArtifacts();

  const errorMsg = "You'll need to share a prototype or design spec first.";
  let msgData = [];

  sharedArtifacts.map(artifact => {
    msgData.push(`# Name: ${artifact.name}`);
    msgData.push(`* Type: ${artifact.type}`);
    msgData.push(`* Target Platform: ${artifact.targetPlatform}`);
    msgData.push(`[View on the web](${artifact.url})`);
  });

  const dialogContent = {
    title: "Shared Artifacts",
    icon: "plugin-icon",
    msgs: msgData.length ? msgData : errorMsg,
    isError: !msgData.length,
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
