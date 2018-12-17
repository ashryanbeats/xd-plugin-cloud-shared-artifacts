/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit:
 * - http://adobexdplatform.com/ for API docs and more sample code.
 * - https://github.com/AdobeXD/plugin-toolkit for the plugin toolkit.
 */

const cloud = require("cloud");
const xdPluginToolkit = require("./lib/dialogs.js");
const errorMsg = "You'll need to share a prototype or design spec first.";

async function myPluginCommand(selection) {
  // Go to Plugins > Development > Developer Console to see this log output
  console.log("Plugin command is running!");

  // An array of objects representing shared protype and/or specs artifacts
  // https://adobexdplatform.com/plugin-docs/reference/cloud.html#cloudgetsharedartifacts
  const sharedArtifacts = cloud.getSharedArtifacts();
  console.log(sharedArtifacts);

  // An array of HTML strings for each shared artifact
  let sharedArtifactHTML = sharedArtifacts.map(artifact => {
    return constructArtifactHTML(artifact);
  });

  // Use the plugin toolkit (see link at top) to construct a dialog
  await xdPluginToolkit.createDialog({
    title: "Shared Artifacts",
    icon: "plugin-icon",
    msgs: sharedArtifactHTML.length ? sharedArtifactHTML : errorMsg,
    isError: !sharedArtifactHTML.length,
    width: 600,
    height: "auto",
    iconSize: 18
  });
}

function constructArtifactHTML(artifact) {
  // Add HTML for common data fields
  let artifactDataHTML = `
    <style>a {text-align: center;}</style>
    <h2>Artifact name: ${artifact.name}</h2>
    <p>• Type: ${artifact.type}</p>
    <p>• Access level: ${artifact.accessLevel}</p>
    <p>• Comments allowed: ${artifact.allowComments ? "Yes" : "No"}</p>
  `;

  // Add HTML for artifact type-specific data fields
  if (artifact.type === cloud.ArtifactType.PROTOTYPE) {
    artifactDataHTML += `
    <p>• Embed width and height: ${artifact.embedWidth} x ${
      artifact.embedHeight
    }</p>
    <p>• Defaults to full page: ${artifact.fullscreenInPage ? "Yes" : "No"}</p>
    <p>• Hotspot hints on: ${artifact.hotspotHints ? "Yes" : "No"}</p>
    `;
  } else if (artifact.type === cloud.ArtifactType.SPECS) {
    artifactDataHTML += `
    <p>• Target platform: ${artifact.targetPlatform}</p>
    `;
  }

  // Append the URL
  artifactDataHTML += `
    <a href=${artifact.url}>Click to view on xd.adobe.com</a>
  `;

  // Return the whole thing
  return artifactDataHTML;
}

module.exports = {
  commands: {
    myPluginCommand: myPluginCommand
  }
};
