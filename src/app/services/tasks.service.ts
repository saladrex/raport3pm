import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Task } from '../model/task';
import { HttpService } from './http.service';


@Injectable()
export class TasksService {

  private tasksListObs = new BehaviorSubject<Array<Task>>([]);


  constructor(private httpService: HttpService) {
    this.httpService.getTasks().subscribe(list => {
      this.tasksListObs.next(list);
    });
    // const tasksList = [
    //     {name: 'helpdesk', created: new Date().toLocaleString(), isDone: false},
    //     {name: 'learn ERP', created: new Date().toLocaleString(), isDone: false},
    //     {name: 'teach ERP', created: new Date().toLocaleString(), isDone: false},
    //     {name: 'make back-up', created: new Date().toLocaleString(), isDone: false},
    //     {name: 'get off from bed', created: new Date().toLocaleString(), end: new Date().toLocaleString(), isDone: true}
    // ];
    // this.tasksListObs.next(tasksList);
  }

  add(task: Task) {
    const list = this.tasksListObs.getValue();
    list.push(task);
    this.tasksListObs.next(list);
  }

  remove(task: Task) {
   const list = this.tasksListObs.getValue().filter( e => e !== task);
    this.tasksListObs.next(list);
  }
  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.tasksListObs.getValue();
    this.tasksListObs.next(list);
  }

  getTasksListObs(): Observable<Array<Task>> {
    return this.tasksListObs.asObservable();
  }

  saveTasksInDb() {
    this.httpService.saveTasks(this.tasksListObs.getValue());
  }

}
