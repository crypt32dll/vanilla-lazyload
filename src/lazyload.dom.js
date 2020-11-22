import { hasEmptyStatus, hasInitialStatus, hasStatusError } from "./lazyload.data";

export const toArray = (nodeSet) => Array.prototype.slice.call(nodeSet);

export const queryElements = (settings) =>
    settings.container.querySelectorAll(settings.elements_selector);

// Exclude elements that are already managed by an instance of LazyLoad
export const excludeManagedElements = (elements) => toArray(elements).filter(hasEmptyStatus);

// Exclude elements that have already been processed so they've either entered, loaded, errored, exited... others
export const excludeProcessedElements = (elements) => toArray(elements).filter(hasInitialStatus);

export const hasError = (element) => hasStatusError(element);
export const filterErrorElements = (elements) => toArray(elements).filter(hasError);

export const getElementsToLoad = (elements, settings) =>
    excludeProcessedElements(elements || queryElements(settings));
