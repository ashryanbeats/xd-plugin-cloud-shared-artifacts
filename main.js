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
  console.log(sharedArtifacts);

  const errorMsg = "You'll need to share a prototype or design spec first.";
  let msgData = sharedArtifacts.map(artifact => {
    let artifactDataHTML = `
        <style>a {text-align: center;}</style>
        <h2>Name: ${artifact.name}</h2>
        <p>• Type: ${artifact.type}</p>
        <p>• Access level: ${artifact.accessLevel}</p>
        <p>• Comments allowed: ${artifact.allowComments ? "Yes" : "No"}</p>
    `;

    if (artifact.type === cloud.ArtifactType.PROTOTYPE) {
      artifactDataHTML += `
        <p>• Embed width and height: ${artifact.embedWidth} x ${
        artifact.embedHeight
      }</p>
        <p>• Defaults to full page: ${
          artifact.fullscreenInPage ? "Yes" : "No"
        }</p>
        <p>• Hotspot hints on: ${artifact.hotspotHints ? "Yes" : "No"}</p>
        `;
    } else if (artifact.type === cloud.ArtifactType.SPECS) {
      artifactDataHTML += `
        <p>• Target platform: ${artifact.targetPlatform}</p>
        `;
    }

    artifactDataHTML += `
      <a href=${artifact.url}>Click to view on xd.adobe.com</a>
    `;

    return artifactDataHTML;
  });

  //   sharedArtifacts.map(artifact => {
  //     msgData.push(`# Name: ${artifact.name}`);
  //     msgData.push(`* Type: ${artifact.type}`);
  //     msgData.push(`* Target Platform: ${artifact.targetPlatform}`);
  //     msgData.push(`[View on the web](${artifact.url})`);
  //   });

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
