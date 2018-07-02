import { inject } from 'aurelia-dependency-injection';
import { bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

const FormBuilder = require('formiojs').FormBuilder;

@customElement('form-builder')
@inject(Element)
export class FormRenderer {
  public instance: any;
  private builder: Element;
  private element: Element;

  @bindable
  private form: object = {};

  @bindable
  private options: any = {};

  constructor(element: Element) {
    this.element = element;
  }

  emit(name: string, data: object) {
    this.element.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      detail: {
        component: data,
        schema: this.instance.schema
      }
    }));
  }

  renderBuilder() {
    if (this.builder) {
      (new FormBuilder(this.builder, this.form, this.options))
        .render()
        .then((instance: any) => {
          this.instance = instance;
          this.instance.off('deleteComponent');
          this.instance.off('updateComponent');
          this.instance.off('saveComponent');
          this.instance.on('deleteComponent', (event: any) => this.emit('change', event));
          this.instance.on('updateComponent', (event: any) => this.emit('change', event));
          this.instance.on('saveComponent', (event: any) => this.emit('change', event));
        });
    }
  }

  attached() {
    this.renderBuilder();
  }

  optionsChanged() {
    this.renderBuilder();
  }

  formChanged() {
    this.renderBuilder();
  }
}
