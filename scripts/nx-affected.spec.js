/**
 * Simple test file that tests nx-affected.js.
 *
 * This test file is not discoverable by the nx test runner. To test, run:
 * `node nx-affected.spec.js` from the project root.
 */

const isProjectAffected = require("./nx-affected");
const execSync = require("child_process").execSync;

const HEAD_COMMIT = "b5689e7c89873b3a74a5129fd087c4fb5e10a6d8";

function assertTrue(value) {
  if (value !== true) {
    throw new Error(`Expected 'true', got ${value}`);
  }
}

function testReturnTrueIfProjectChanged() {
  const OLD_COMMIT = "c70077323ee2d57e8f0826d49fef2fc467562543";
  assertTrue(isProjectAffected("todo-app", OLD_COMMIT, HEAD_COMMIT));
}

function testReturnFalseIfProjectDidNotChange() {
  const OLD_COMMIT = "b5689e7c89873b3a74a5129fd087c4fb5e10a6d8";
  assertTrue(!isProjectAffected("todo-app", OLD_COMMIT, HEAD_COMMIT));
}

function testReturnFalseForNonexistentProject() {
  assertTrue(!isProjectAffected("bogus-project", null, HEAD_COMMIT));
}

function testCanRunWithCommandLineArgs() {
  const OLD_COMMIT = "c70077323ee2d57e8f0826d49fef2fc467562543";

  const command = `node ./scripts/nx-affected.js todo-app ${OLD_COMMIT} ${HEAD_COMMIT}`;
  const output = execSync(command).toString().trim();

  assertTrue(output == "true");
}

function test() {
  testReturnTrueIfProjectChanged();
  testReturnFalseIfProjectDidNotChange();
  testReturnFalseForNonexistentProject();
  testCanRunWithCommandLineArgs();
}

test();
