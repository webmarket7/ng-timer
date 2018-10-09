import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef
} from '@angular/core';

@Injectable()
export class PopupService {

    constructor(
        private resolver: ComponentFactoryResolver,
        private appRef: ApplicationRef
    ) {}

    create(component, host?: ViewContainerRef, index?: number, injector?: Injector, projectedContent?: any[][]) {
        const
            defaultContainer = this.appRef.components[0].instance.popupContainer,
            container = host ? host : defaultContainer,
            componentFactory = this.resolver.resolveComponentFactory(component),
            popup: ComponentRef<any> = container.createComponent(componentFactory, index, injector, projectedContent);

            popup.instance.close.subscribe(() => {
                popup.destroy();
            });

        return popup.instance;
    }
}
