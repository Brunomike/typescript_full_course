/**
 * /// <reference path="base-component.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../models/drag-drop.ts"/>
 */
import {DragTarget} from '../models/drag-drop.js';
import { ProjectItem } from './project-item.js';
import { Project ,ProjectStatus} from '../models/project.js';
import { Component } from './base-component.js';
import { AutoBind } from '../decorators/autobind.js';
import { projectState } from './../state/project-state.js';

//namespace App {
    //ProjectList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
        assignedProjects: Project[];

        constructor(private type: 'active' | 'finished') {
            super('project-list', 'app', false, `${type}-projects`);
            this.assignedProjects = [];

            this.configure();
            this.renderContent();
        }

        @AutoBind
        dragOverHandler(event: DragEvent) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const list = this.element.querySelector('ul')!;
                list.classList.add('droppable');
            }

        }

        @AutoBind
        dropHandler(event: DragEvent) {
            const projectId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
        }

        @AutoBind
        dragLeaveHandler(_: DragEvent) {
            const list = this.element.querySelector('ul')!;
            list.classList.remove('droppable');
            //console.log('DROP ZONE LEFT');
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);

            projectState.addListener((projects: Project[]) => {
                const relevantProjects = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === ProjectStatus.Active
                    }
                    return prj.status === ProjectStatus.Finished
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }

        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
        }

        private renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
            listEl.innerHTML = '';
            for (const projectItem of this.assignedProjects) {
                // const listItem = document.createElement('li');
                // listItem.textContent = projectItem.title;
                // listEl?.appendChild(listItem);
                new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
            }
        }
    }
//}