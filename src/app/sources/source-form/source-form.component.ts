import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild
} from '@angular/core';
import { Source } from '../source';
import { TagService } from '../../shared/tag.service';
import { Tag } from '../../shared/tag';
import { CollectionsService } from '../../administration/collections.service';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CountryListService } from 'src/app/shared/country-list.service';
import { LanguageListService } from 'src/app/shared/language-list.service';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { BackendActivityState } from 'src/app/shared/request-watcher.service';
import { StoryService } from 'src/app/shared/story.service';
import { Story } from 'src/app/shared/story';

/** Custom validator that checks that an autocomplete field either
 *  has valid input or are completly empty.
 */
export function autocompleteSelectedValidator(attrName = 'code'): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const ok =
      !control.value ||
      (typeof control.value === 'object' && !!control.value && !!control.value[attrName]) ||
      (typeof control.value === 'string' && control.value.trim() === '');

    return !ok ? { selection: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-source-form',
  templateUrl: './source-form.component.html',
  styleUrls: ['./source-form.component.scss']
})
export class SourceFormComponent implements OnInit, OnChanges {
  @Input() source: Source;
  @Input() activityState: BackendActivityState;
  @Output() save = new EventEmitter<Source>();
  @Output() dirty = new EventEmitter<boolean>();

  @ViewChild('submitButton') submitButton;

  tags$: Observable<Tag[]>;
  stories$: Observable<Story[]>;

  filteredCountryOptions: Observable<{ name: string; code: string }[]>;
  filteredLanguageOptions: Observable<{ name: string; code: string }[]>;
  filteredCollectionOptions: Observable<{ name: string; id: number }[]>;

  sourceForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    public: new FormControl(''),
    tags: new FormControl(),
    stories: new FormControl(),
    country: new FormControl('', [autocompleteSelectedValidator('code')]),
    language: new FormControl('', [autocompleteSelectedValidator('code')]),
    collection: new FormControl('', [autocompleteSelectedValidator('id')]),
    date: new FormControl(),
    sourceId: new FormControl('')
  });

  constructor(
    private tagService: TagService,
    private storyService: StoryService,
    private collectionService: CollectionsService,
    private countryList: CountryListService,
    private languageList: LanguageListService
  ) {}

  ngOnInit() {
    this.tags$ = this.tagService.getList();
    this.stories$ = this.storyService.getList();

    this.filteredCollectionOptions = combineLatest(
      this.sourceForm.get('collection').valueChanges.pipe(startWith('')),
      this.collectionService.getList()
    ).pipe(map(([query, collections]) => this._filterCollections(query, collections)));

    this.filteredCountryOptions = combineLatest(
      this.sourceForm.get('country').valueChanges.pipe(startWith('')),
      this.countryList.getList()
    ).pipe(map(([query, countryList]) => this._filter(query, countryList)));

    this.filteredLanguageOptions = combineLatest(
      this.sourceForm.get('language').valueChanges.pipe(startWith('')),
      this.languageList.getList()
    ).pipe(map(([query, langList]) => this._filter(query, langList)));

    // Signal form status to parent component
    this.sourceForm.statusChanges
      .pipe(
        map(v => this.sourceForm.dirty),
        distinctUntilChanged(),
        startWith(false)
      )
      .subscribe(v => this.dirty.next(v));

    // Strip any newlines from the title field
    const titleInput = this.sourceForm.get('title');
    titleInput.valueChanges.subscribe(value =>
      titleInput.setValue(value.replace(/\n/g, ''), { emitEvent: false })
    );
  }

  ngOnChanges(changes) {
    if (changes.source) {
      this.sourceForm.patchValue(this.source);

      this.countryList.getList().subscribe(list => {
        const val = list.find(v => v.code === this.source.country);
        this.sourceForm.get('country').setValue(val);
      });

      this.languageList.getList().subscribe(list => {
        const val = list.find(v => v.code === this.source.language);
        this.sourceForm.get('language').setValue(val);
      });

      this.sourceForm.get('collection').setValue(this.source.collection);
    }
  }

  onSubmit() {
    // Set all controls as touched to show errors
    Object.keys(this.sourceForm.controls).forEach(key => {
      this.sourceForm.get(key).markAsTouched();
    });

    if (!this.sourceForm.valid) {
      return;
    }

    const formValue = this.sourceForm.value;

    // When an option was found, an object is the value, otherwise a string.
    // Take the code of a valid option object, or nothing.
    formValue['country'] =
      !!formValue['country'] && !!formValue['country'].code ? formValue['country'].code : null;
    formValue['language'] =
      !!formValue['language'] && !!formValue['language'].code ? formValue['language'].code : null;
    formValue['collection_id'] =
      !!formValue['collection'] && !!formValue['collection'].id ? formValue['collection'].id : null;
    this.source = Object.assign(this.source, this.sourceForm.value);

    if (!this.sourceForm.value.date) {
      // Allow date to be undefined / not set.
      this.source.date = undefined;
    }

    this.save.emit(this.source);
  }

  private _filter(value: string | { name: string }, items: { name: string; code: string }[]) {
    // Determine the filter input value (query, current value of input field)
    const filterValue =
      typeof value === 'string'
        ? value.toLowerCase()
        : value && typeof value.name === 'string'
        ? value.name.toLowerCase()
        : '';

    // Look for query string contained in items' name and also code
    return items.filter(option => {
      return (
        option.name.toLowerCase().indexOf(filterValue) !== -1 ||
        option.code.toLowerCase().indexOf(filterValue) !== -1
      );
    });
  }

  private _filterCollections(
    value: string | { name: string },
    items: { name: string; id: number }[]
  ) {
    // Determine the filter input value (query, current value of input field)
    const filterValue =
      typeof value === 'string'
        ? value.toLowerCase()
        : value && typeof value.name === 'string'
        ? value.name.toLowerCase()
        : '';

    // Look for query string contained in items' name and also code
    return items.filter(option => {
      return option.name.toLowerCase().indexOf(filterValue) !== -1;
    });
  }

  /**
   * display mapper function for the autocomplete fields (from option to name)
   */
  private _displayOption(option) {
    return option ? option.name : undefined;
  }
}
