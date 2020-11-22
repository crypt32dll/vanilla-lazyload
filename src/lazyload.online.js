import { runningOnBrowser } from "./lazyload.environment";
import { setStatus } from "./lazyload.data";
import { removeClass } from "./lazyload.class";
import { queryElements, filterErrorElements } from "./lazyload.dom";
import { statusObserved } from "./lazyload.elementStatus";

export const retryLazyLoad = (settings, instance) => {
    const errorElements = filterErrorElements(queryElements(settings));
    errorElements.forEach((element) => {
        removeClass(element, settings.class_error);
        setStatus(element, statusObserved);
    });
    instance.update();
};

export const setOnlineCheck = (settings, instance) => {
    if (!runningOnBrowser) {
        return;
    }
    window.addEventListener("online", () => {
        retryLazyLoad(settings, instance);
    });
};
