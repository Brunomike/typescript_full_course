/**
 * /// <reference path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/base-component.ts" />
/// <reference path="components/project-item.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
 */

import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js';

//namespace App {
const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');
//}

//npm i --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader