import { setStatus } from "./lazyload.data";
import { statusObserved } from "./lazyload.elementStatus";
import { supportsIntersectionObserver } from "./lazyload.environment";
import { onEnter, onExit } from "./lazyload.intersectionHandlers";
import { shouldUseNative } from "./lazyload.native";
import { resetObserver } from "./lazyload.unobserve";
import { excludeManagedElements } from "./lazyload.dom";

export const isIntersecting = (entry) => entry.isIntersecting || entry.intersectionRatio > 0;

const getObserverSettings = (settings) => ({
    root: settings.container === document ? null : settings.container,
    rootMargin: settings.thresholds || settings.threshold + "px"
});

const intersectionHandler = (entries, settings, instance) => {
    entries.forEach((entry) =>
        isIntersecting(entry)
            ? onEnter(entry.target, entry, settings, instance)
            : onExit(entry.target, entry, settings, instance)
    );
};

export const observeElements = (observer, elements) => {
    const elementsToObserve = excludeManagedElements(elements);
    elementsToObserve.forEach((element) => {
        observer.observe(element);
        setStatus(element, statusObserved);
    });
};

export const updateObserver = (observer, elementsToObserve) => {
    resetObserver(observer);
    observeElements(observer, elementsToObserve);
};

export const setObserver = (settings, instance) => {
    if (!supportsIntersectionObserver || shouldUseNative(settings)) {
        return;
    }
    instance._observer = new IntersectionObserver((entries) => {
        intersectionHandler(entries, settings, instance);
    }, getObserverSettings(settings));
};
