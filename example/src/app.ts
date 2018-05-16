const _ = require('lodash');
export class App {
  private builderForm: any = {components: []};
  private form: any = {components: []};
  private selectForm: any = {
    components: [
      {
        type: 'select',
        input: true,
        hideLabel: true,
        widget: 'html5',
        dataSrc: 'values',
        data: {
          values: [
            {label: 'Form', value: 'form'},
            {label: 'Wizard', value: 'wizard'},
            {label: 'PDF', value: 'pdf'}
          ]
        }
      }
    ]
  };
  private json: Element;
  private subjson: Element;

  formChanged(event: CustomEvent) {
    this.form = _.cloneDeep(event.detail.schema);
    if (this.json) {
      this.json.innerHTML = '';
      this.json.appendChild(document.createTextNode(JSON.stringify(this.form, null, 4)));
    }
  }

  displayChanged(event: CustomEvent) {
    if (event.detail && event.detail.data.select) {
      let newForm = _.cloneDeep(this.form);
      newForm.display = event.detail.data.select;
      this.builderForm = newForm;
    }
  }

  submissionChanged(event: CustomEvent) {
    if (this.subjson) {
      this.subjson.innerHTML = '';
      this.subjson.appendChild(document.createTextNode(JSON.stringify(event.detail.data, null, 4)));
    }
  }
}
