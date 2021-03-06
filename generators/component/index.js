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
      this.env.error('Sintax error, you must use the sintax: batangularjs:component <module> <component> [-t][-c][-i]');
    }
  }

  args(){
    this.module = this.args[0];
    this.componentName = this.args[1];

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
    if(this.opts.c){
      this.dest +=  `core/`;
    }
    if(this.opts.t){
      this.dest +=  `components/`;
    }
  }

  writing(){
    if(this.opts.i) {
      this._copyFileByTemplate('component-separated.js');
      this._copyFileByTemplate('component-separated.html');
    } else {
      this._copyFileByTemplate('component.js');
    }
  }

  _copyFileByTemplate(templateName) {
    let extension = templateName.split('.').reverse()[0];
    let type = 'component';
    if(extension === 'html') type = 'template';

    let folderInApp = this.dest.split('/');
    folderInApp.shift();
    folderInApp = folderInApp.join('/');

    this.fs.copyTpl(
      this.templatePath(templateName),
      this.destinationPath(`${this.dest}${this.componentName}.${type}.${extension}`),
      {
        moduleName: this.moduleName,
        componentName: this.componentName,
        capitalizeComponentName: this._capitalize(this.componentName),
        folder: folderInApp
      }
    );
  }

  _capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
