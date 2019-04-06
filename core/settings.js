/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const fs = require('fs');
const path = require('path');
const merge = require('merge');
const userHome = require('user-home');

/**
 * Singleton object for accessing the configuration
 */
class Settings {
	/**
	 * Kick things off
	 */
	constructor() {
		this._config = Settings.parseConfig();
	}

	/**
	 * Read and parse the configuration file
	 */
	static parseConfig() {
		let globalConfig;
		let localConfig;
		let mergedConfig;
		const globalPath = path.join(userHome, '.jimrc.js');
		if (fs.existsSync(globalPath)) {
			globalConfig = require(globalPath);
		}
		const localPath = path.join(process.cwd(), '.jimrc.js');
		if (fs.existsSync(localPath)) {
			localConfig = require(localPath);
		}
		if (globalConfig) {
			mergedConfig = merge.recursive(globalConfig, localConfig);
		} else {
			mergedConfig = localConfig;
		}

		return mergedConfig;
	}

	/**
	 * Returns the configuration object
	 */
	get config() {
		return this._config;
	}
}

const instance = new Settings();
Object.freeze(instance);

module.exports = instance;
