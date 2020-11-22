import { removeEventListeners } from "./lazyload.event";
import { resetSourcesImg, restoreOriginalAttributesImg } from "./lazyload.setSources";
import { safeCallback } from "./lazyload.callback";
import { removeClass } from "./lazyload.class";
import { updateLoadingCount } from "./lazyload.counters";
import { hasStatusLoading, setStatus } from "./lazyload.data";
import { statusObserved } from "./lazyload.elementStatus";

export const cancelLoading = (element, entry, settings, instance) => {
    if (!settings.cancel_on_exit) return;
    if (!hasStatusLoading(element)) return;
    if (element.tagName !== "IMG") return; //Works only on images
    removeEventListeners(element);
    resetSourcesImg(element, settings, instance);
    restoreOriginalAttributesImg(element);
    removeClass(element, settings.class_loading);
    updateLoadingCount(instance, -1);
    setStatus(element, statusObserved);
    safeCallback(settings.callback_cancel, element, entry, instance);
};
