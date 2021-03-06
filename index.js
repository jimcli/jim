#!/usr/bin/env node

const { argv } = require('yargs');
const Logger = require('@jimcli/logger');
const Settings = require('./core/settings');
const WorkflowLoader = require('./core/workflow-loader');

const params = argv._;
const workflowName = params.shift();

const Workflow = WorkflowLoader.load(workflowName);
const workflowSettings = {
	global: Settings.global,
	workflow: Settings.workflows[workflowName]
		? Settings.workflows[workflowName]
		: {},
};

new Workflow({
	Logger,
	...workflowSettings,
	params,
}).run();
