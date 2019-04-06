#!/usr/bin/env node

const { argv } = require('yargs');
const Settings = require('./core/settings');
const Logger = require('./core/logger');
const WorkflowLoader = require('./core/workflow-loader');

const params = argv._;
const workflowName = params.shift();

const Workflow = WorkflowLoader.load(workflowName);

new Workflow({
	Logger,
	Settings,
	params,
}).run();
