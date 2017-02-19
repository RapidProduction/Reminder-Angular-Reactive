import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './components/app.component';
import { TodoPageComponent } from './components/todo-page.component';
import { TodoListComponent } from './components/todo-list.component';
import { TodoComponent } from './components/todo.component';
 
@NgModule({
  imports:[ BrowserModule ],
  
  declarations: [
  	AppComponent,
  	TodoPageComponent,
  	TodoListComponent,
  	TodoComponent,
  ],

  bootstrap:[ AppComponent ]
})
export class AppModule { }
