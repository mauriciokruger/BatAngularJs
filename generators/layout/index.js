'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator{

  constructor(args, opts) {
    super(args, opts);

    this.args = args;
    this.opts = opts;

  }

  validateArgs(args){
    if(this.args.length < 2){
      this.env.error('Sintax error, you must use the sintax: batangularjs:layout <module> <component> [-t]');
    }
  }

  args(){
    this.module = this.args[0];
    this.layoutName = this.args[1];

		this.moduleName = 'app';
		if(this.module !== 'app'){
			this.moduleName += `.${this.module}`;
		}
  }

  folder(){
		let moduleFolder = this.module.replace('.', '/');
    this.dest = 'app/';
    if(this.module !== 'app') {
      this.dest +=  `${moduleFolder}/`;
    }
    if(this.opts.t){
      this.dest +=  `layouts/`;
    }
  }

  writing(){
    this.fs.copyTpl(
      this.templatePath('layout.html'),
      this.destinationPath(`${this.dest}${this.layoutName}.template.html`)
    );
    this.fs.copyTpl(
      this.templatePath('../../controller/templates/controller.js'),
      this.destinationPath(`${this.dest}${this.layoutName}.controller.js`),
      {
        moduleName: this.moduleName,
        controllerName: this._capitalize(this.layoutName)
      }
    );
  }

  _capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
