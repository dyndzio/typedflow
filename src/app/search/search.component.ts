import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BehaviorSubject, EMPTY, Observable, Subject} from "rxjs";
import {ReposInterface} from "../repos.interface";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {ApiService} from "../../api.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger(
      'contentAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, height: 0 }),
            animate('0.4s ease-out',
              style({ opacity: 1, height: 40 + 'vh' }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, height: 40 + 'vh' }),
            animate('0.4s ease-in',
              style({ opacity: 0, height: 0 }))
          ]
        )
      ]
    )
  ]
})
export class SearchComponent {
  input: FormControl;
  filter$: Observable<string>;
  gitHubData: Subject<ReposInterface[]> = new BehaviorSubject([]);
  triggerContent: boolean = false;
  constructor(private apiService: ApiService) {
    this.input = new FormControl('');
    this.filter$ = this.input.valueChanges;
    //if input value changed and 500ms passed between the last type and the value is different than before this triggers
    this.filter$.pipe(debounceTime(500), distinctUntilChanged(), switchMap(result => {
      // in github username must have more than one character so to prevent api call I added this if
      if (result.length > 1 ) {
        return this.apiService.get(`https://api.github.com/users/${result}/repos`, this.input.value)
      } else {
        //to hide last results
        this.gitHubData.next([]);
        //trigger content is for :enter and :leave animation.
        this.triggerContent = false;
        //emits Observable that is empty and finished.
        return EMPTY;
      }
    })).subscribe(result => {
      //result of our repo search goes to filter function
      this.applyFilter(result);
    })
  }
  applyFilter(data) {
    //remove forked projects.
    let githubData = data.filter(res => res.fork !== true);
    //check if no error
    if (data[0] && !data[0].error) {
      //add branches to repo.
      githubData.forEach(obj => {
        obj.branches = [];
        this.apiService.get(`https://api.github.com/repos/${this.input.value}/${obj.name}/branches`).subscribe(result => {
          // if user got branches
          if (result[0]) {
            obj.branches = result;
          }
        })
      })
    }
    //emit new list to display
    this.gitHubData.next(githubData);
    this.triggerContent = true;
  }

}
