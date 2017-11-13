#### TheShiftLeft November 2017
## Ionic 3 Templates
Refer Document [Laravel_Ionic_Firebase](https://drive.google.com/open?id=1TTlFFEFYYzR0KzX4vbpvGrPZKDBbUFvGMk4n5XmxqWg) for detailed info
### Basic Starter Template - git tag: v1
* Tabs  - Tab pages are recorded in `tabs.ts` and `tabs.html`. 
* Menu  - Menu items are recorded in `app.component.ts` in `this.pages[]`.
* `Network` Provider - Show splash if internet not available)
* Register Back Button for Android - `app.component.ts`.
* Hide Splashscreen mechanism to display splash while loading -   `app.component.ts`.
* `Util` Provider for common services
### Starter Template with Authentication - git tag: v2
* `Authentication` Provider
* Registration, Signup and Change Password pages - Only show at first startup.
* Uses `AngularFire2` library  - wrapping Firebase in Angular2 for easy implementation of Observers.
* `Moment` Library for handling Date formats - in Pipes etc.
* Application needs to be registered with `Firebase`.


