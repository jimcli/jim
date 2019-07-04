/* eslint-disable no-console */

const chalk = require('chalk');
const logSymbols = require('log-symbols');
const { argv } = require('yargs');
const timestamp = require('time-stamp');
const ora = require('ora');

/**
 * Jim's logging-module
 *
 * This module contains static methods to log messages.
 */
module.exports = class Logger {
	/**
	 * Logs an info message
	 *
	 * @param {String} _message The message to log
	 */
	static info(_message, _force = false) {
		if ((argv.q || argv.quiet) && !_force) {
			return;
		}
		console.log(
			Logger.getTimestamp(),
			logSymbols.info,
			chalk.blue(_message)
		);
	}

	/**
	 * Logs a warning message
	 *
	 * @param {String} _message The message to log
	 */
	static warning(_message, _force = false) {
		if ((argv.q || argv.quiet) && !_force) {
			return;
		}
		console.log(
			Logger.getTimestamp(),
			logSymbols.warning,
			chalk.yellow(_message)
		);
	}

	/**
	 * Logs an error message
	 *
	 * @param {String} _message The message to log
	 */
	static error(_message, _force) {
		if ((argv.q || argv.quiet) && !_force) {
			return;
		}
		console.log(
			Logger.getTimestamp(),
			logSymbols.error,
			chalk.red(_message)
		);
	}

	/**
	 * Logs a success message
	 *
	 * @param {String} _message The message to log
	 */
	static success(_message, _force = false) {
		if ((argv.q || argv.quiet) && !_force) {
			return;
		}
		console.log(
			Logger.getTimestamp(),
			logSymbols.success,
			chalk.green(_message)
		);
	}

	static log(_message, _force = false) {
		if ((argv.q || argv.quiet) && !_force) {
			return;
		}
		console.log(Logger.getTimestamp(), _message);
	}

	/**
	 * Generates the output for the current timestamp
	 *
	 * @private
	 */
	static getTimestamp() {
		return chalk.dim(chalk.white(`[${timestamp('HH:mm:ss')}]`));
	}

	/**
	 * Displays a loading spinner
	 *
	 * @param {String} _message Message to display next to the loading spinner
	 */
	static showLoadingSpinner(_message) {
		this._spinner = ora(_message).start();
	}

	/**
	 * Removes the loading spinner
	 */
	static removeLoadingSpinner() {
		this._spinner.stop();
	}
};
