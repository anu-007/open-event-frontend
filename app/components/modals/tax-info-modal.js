import ModalBase from 'open-event-frontend/components/modals/modal-base';
import FormMixin from 'open-event-frontend/mixins/form';
import Ember from 'ember';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { orderBy } from 'lodash';

const { computed } = Ember;

export default ModalBase.extend(FormMixin, {
  isSmall : true,
  options : {
    closable: false
  },

  autoScrollToErrors : false,
  includeTaxInPrice  : 'include',

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        tax_name: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please give a name')
            }
          ]
        },
        tax_rate: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please tell us your tax rate (in %)')
            },
            {
              type   : 'number',
              prompt : this.i18n.t('Please give a valid tax rate')
            }
          ]
        },
        tax_id: {
          rules: [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please give us your tax ID')
            }
          ]
        },
        tax_invoice_company: {
          depends : 'send_tax_invoices',
          rules   : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please give us your company name')
            }
          ]
        },
        tax_invoice_address: {
          depends : 'send_tax_invoices',
          rules   : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please give us your address')
            }
          ]
        }
      }
    };
  },

  countries: computed(function() {
    return orderBy(countries, 'name');
  }),

  onVisible() {
    this.set('includeTaxInPrice', this.get('taxInfo.includeTaxInPrice') ? 'include' : 'add');
  },

  actions: {
    updateTaxInfo() {
      this.$('.ui.form').form('validate form');
      if (this.$('.ui.form').form('is valid')) {
        this.set('taxInfo.includeTaxInPrice', this.get('includeTaxInPrice') === 'include');
        this.close();
        this.set('hasTaxInfo', true);
      }
    }
  }

});
