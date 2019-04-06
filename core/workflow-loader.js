const importGlobal = require('import-global');
const chalk = require('chalk');
const Settings = require('./settings');
const Logger = require('./logger');

/**
 * The workflowloader is responsible for locating and loading workflow-packages
 */
module.exports = class WorkflowLoader {
	/**
	 * Loads a workflow and returns the module
	 *
	 * Will first try to load the workflow from the global namespace, then
	 * from @jimcli and afterwards every source that is specified in the
	 * configuration. Will stop at the first successful source.
	 *
	 * @param {String} _name Name of the workflow
	 */
	static load(_name) {
		let workflow;
		workflow = WorkflowLoader._loadByGlobal(_name);
		if (!workflow) {
			workflow = WorkflowLoader._loadByNamespace('@jimcli', _name);
		}
		if (!workflow && Settings.config.namespaces) {
			for (const namespace of Settings.config.namespaces) {
				workflow = WorkflowLoader._loadByNamespace(namespace, _name);
				if (workflow) {
					break;
				}
			}
		}
		if (!workflow) {
			Logger.error(
				`The workflow ${chalk.bold(
					_name
				)} could not be found. You need to have the package installed globally (install with npm i -g).`
			);
			process.exit(0);
		}
		return workflow;
	}

	/**
	 * Load from the global namesapce
	 *
	 * @param {String} _name Name of the workflow
	 */
	static _loadByGlobal(_name) {
		return importGlobal.silent(`jim-workflow-${_name}`);
	}

	/**
	 * Load from a namespace
	 *
	 * @param {String} _namespace The namespace to load from
	 * @param {String} _name Name of the workflow
	 */
	static _loadByNamespace(_namespace, _name) {
		return importGlobal.silent(`${_namespace}/jim-workflow-${_name}`);
	}
};
