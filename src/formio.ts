import { inject } from 'aurelia-dependency-injection';
import { bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
const Form = require('formiojs').Form;

@customElement('formio')
@inject(Element)
export class FormRenderer {
    public instance: any;
    private formio: Element;
    private element: Element;

    @bindable
    private src: string = '';

    @bindable
    private form: object = {};

    @bindable
    private submission: object = {};

    @bindable
    private options: any = {};

    constructor(element: Element) {
        this.element = element;
    }

    attached() {
        this.buildForm();
    }

    emit(name: string, data: object) {
        this.element.dispatchEvent(new CustomEvent(name, {
            bubbles: true,
            detail: data
        }));
    }

    hasSubmission() {
        return Object.keys(this.submission).length === 0 && this.submission.constructor === Object;
    }

    buildForm() {
        if (this.formio) {
            (new Form(this.formio, this.src || this.form, this.options))
                .then((instance: any) => {
                    this.instance = instance;
                    if (this.hasSubmission()) {
                        this.instance.submission = this.submission;
                    }
                    this.instance.off('change');
                    this.instance.off('formLoad');
                    this.instance.off('render');
                    this.instance.off('error');
                    this.instance.off('submit');
                    this.instance.off('submitDone');
                    this.instance.on('change', (event: any) => this.emit('change', event));
                    this.instance.on('formLoad', (event: any) => this.emit('formLoad', event));
                    this.instance.on('render', (event: any) => this.emit('render', event));
                    this.instance.on('error', (event: any) => this.emit('error', event));
                    this.instance.on('submitDone', (event: any) => this.emit('submit', event));
                });
        }
    }

    srcChanged() {
        this.buildForm();
    }

    formChanged() {
        this.buildForm();
    }

    submissionChanged(submission: any) {
        if (this.instance) {
            this.instance.submission = submission;
        }
    }

    optionsChanged() {
        this.buildForm();
    }
}
