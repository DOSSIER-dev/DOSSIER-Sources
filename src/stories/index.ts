import { storiesOf } from '@storybook/angular';
// import { action } from '@storybook/addon-actions';
import { SourceItemComponent } from 'src/app/sources-list/source-item/source-item.component';

storiesOf('Source List Item', module)
  .add('basic', () => ({
    component: SourceItemComponent,
    props: {
      source: {
        title: "Test Source"
      }
    },
  }));
