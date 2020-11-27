import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationEditorPage } from './location-editor.page';

describe('LocationEditorPage', () => {
  let component: LocationEditorPage;
  let fixture: ComponentFixture<LocationEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
