const execSync = require("child_process").execSync;

/**
 * Tests whether a NX project (app or lib) has been affected.
 *
 * @param {string} projectName
 * @param {string} baseCommit
 *
 * @returns a boolean indicating whether this project has been affected.
 */
function isProjectAffected(projectName, baseCommit, headCommit) {
  headCommit = headCommit ? headCommit : "HEAD";
  let getAffected = baseCommit
    ? `nx print-affected --base=${baseCommit} --head=${headCommit}`
    : `nx print-affected`;

  const output = execSync(getAffected).toString();
  const changedProjects = JSON.parse(output).projects;

  return changedProjects.includes(projectName);
}

const args = process.argv.slice(2);
if (args.length > 0) {
  console.log(isProjectAffected(...args));
}

module.exports = isProjectAffected;
