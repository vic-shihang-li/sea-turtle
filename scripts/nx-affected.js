/**
 * Utility to check an nx project has been affected.
 *
 * This utility can be imported as a function or invoked directly via this js
 * file:
 * `node ./scripts/nx-affected.js [project-name] <base-commit> <head-commit>`
 */

const execSync = require("child_process").execSync;

/**
 * Tests whether a NX project (app or lib) has been affected.
 *
 * @param {string} projectName one of the project names in this nx workspace
 * @param {string} baseCommit optional commit hash. If not provided, default to
 *    the one chosen by the nx cli.
 * @param {string} headCommit optional commit hash. If not provided, default to
 *    the HEAD commit.
 *
 * @returns a boolean indicating whether this project has been affected.
 */
function isProjectAffected(projectName, baseCommit, headCommit) {
  headCommit = headCommit ? headCommit : "HEAD";
  let getAffected = baseCommit
    ? `npx nx print-affected --base=${baseCommit} --head=${headCommit}`
    : `npx nx print-affected`;

  const output = execSync(getAffected).toString();
  const changedProjects = JSON.parse(output).projects;

  return changedProjects.includes(projectName);
}

const args = process.argv.slice(2);
if (args.length > 0) {
  console.log(isProjectAffected(...args));
}

module.exports = isProjectAffected;
