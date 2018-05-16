# aurelia-formio
This is a JSON Form Renderer and Builder for the Aurelia Framework

## Installation
To install this within your application, type the following.

```
npm install --save aurelia-formio
```

Now, within your application configuration, register this plugin as follows.

```
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-formio'));
```

## Form Renderer
To embed the Form renderer within your application, you need to use the following component.

```
<formio></formio>
```

There are several parameters that can be passed to this component which are as follows.

 - **src** - This is the Form.io Form URL
 - **form** - The JSON schema of the form you wish to render.
 - **submission** - The submission object to populate the form with.
 - **options** - JSON options to pass to the renderer.

### Rendering a Form.io Form
To render a Form.io form, you can pass the URL of that form to the form renderer like the following.

```
<formio src="https://examples.form.io/example"></formio>
```

### Rendering a JSON form.
To render a JSON form, you can create a JSON form object within your ModelView class and then bind it to the **form** parameter as follows.

**app.ts**
```js
export class App {
  private form: any = {
    components: [
      {
        type: 'textfield',
        input: true,
        key: 'firstName',
        label: 'First Name'
      },
      {
        type: 'textfield',
        input: true,
        key: 'lastName',
        label: 'Last Name'
      }
    ]
  };
}
```

**app.html**
```html
<template>
    <formio form.bind="form"></formio>
</template>
```

### Setting the submission value.
You can also set the submission of the form that is filled out using the following.

**app.ts**
```js
export class App {
  private submission: any = {
    data: {
        firstName: 'Joe',
        lastName: 'Smith'
    }
  };
}
```

**app.html**
```html
<formio src="https://examples.form.io/example" submission.bind="submission"></formio>
```

### Passing renderer options.
There are a number of [options available](https://github.com/formio/formio.js/wiki/Form-Renderer#options) to the Form.io renderer that can also be passed to this renderer.

**app.ts**
```js
export class App {
  private submission: any = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith'
    }
  };
  private formOptions: any = {
    readOnly: true
  };
}
```

**app.html**
```html
<formio src="https://examples.form.io/example" submission.bind="submission" options.bind="formOptions"></formio>
```

### Events
There are a number of events that also get fired within the renderer.

 - **change** - Fired when the submission changes within the form.
 - **formLoad** - Fired after the form is done loading.
 - **render** - Fired after the form is done rendering.
 - **error** - Fired when a submission error occurs.
 - **submit** - Fired after a submit has been performed to the server.

You can register for events within this application as follows.

**app.ts**
```js
export class App {
  private submission: any = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith'
    }
  };

  onSubmissionChange(changed: CustomEvent) {
    console.log(changed);
  }
}
```

**app.html**
```html
<formio src="https://examples.form.io/example" submission.bind="submission" change.delegate="onSubmissionChange($event)"></formio>
```

## Form Builder
This library also provides a robust Form Builder interface with the following component.

```
<form-builder form.bind="myForm"></form-builder>
```

The following options are provided to the form builder.

 - **form** - The form JSON to provide as a default to the builder.
 - **options** - The form builder options to provide to the builder.

### Events
There are also a number of events that get fired for the form builder.

 - **change** - Triggered everytime the form schema changes in the builder.

### Example Builder
Here is an example application that listens to the change events from the form builder as well as provides a default form.

**app.ts**
```js
export class App {
  private form: any = {
    components: [
        {
            type: 'textfield',
            input: true,
            label: 'First Name',
            key: 'firstName'
        },
        {
            type: 'textfield',
            input: true,
            label: 'Last Name',
            key: 'lastName'
        }
    ]
  };

  onFormChanged(changed: CustomEvent) {
    console.log(changed);
  }
}
```

**app.html**
```html
<form-builder form.bind="form" change.delegate="onFormChanged($event)"></form-builder>
```

## Example Application
For a working example application, take a look at the **example** folder found within this repository.

