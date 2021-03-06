import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('explore-side-bar', 'Integration | Component | explore side bar');

test('it renders', function(assert) {
  this.render(hbs`{{explore/side-bar i18n=i18n}}`);
  assert.ok(this.$().html().trim().includes('Categories'));
});
