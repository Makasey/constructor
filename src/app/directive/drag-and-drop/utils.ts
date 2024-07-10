import { Injector, Renderer2 } from "@angular/core";


export const DEFAULT_COPY_STYLES = ['flex', 'padding', 'color', 'border', 'background-color', 'flex-direction', 'justify-content', 'gap', 'border-radius', 'align-items', 'font-size', 'width', 'height'];


export function getCopyElementStyles(sourceElement: HTMLElement, copyStyleKeys: string[] = DEFAULT_COPY_STYLES): Record<string, string> {
    const result: Record<string, string> = {};
    const rootElementStyles = sourceElement.computedStyleMap();    

    
    for(let key of copyStyleKeys) {    
        const value = rootElementStyles.get(key)?.toString() ?? "";
        const condition = copyStyleKeys.includes(key) && !result[key] && value;

        if(condition) {
            result[key] = value;
        }
    }

    return result;
}

export function copyCloneNodeStyles(sourceElement: HTMLElement, destinationElement: HTMLElement, injector: Injector): void {
    const renderer = injector.get(Renderer2);

    const rootStyles = getCopyElementStyles(sourceElement);

    for(let [key, value] of Object.entries(rootStyles)) {
        renderer.setStyle(destinationElement, key, value);
    }

    const srcElements = sourceElement.getElementsByTagName("*") as HTMLCollectionOf<HTMLElement>;
    const dstElements = destinationElement.getElementsByTagName("*") as HTMLCollectionOf<HTMLElement>;

    if(!srcElements.length) {
        return;
    }

    for(let index = 0; index < srcElements.length; index++) {
        copyCloneNodeStyles(srcElements[index], dstElements[index], injector);
    }
  
    return;
}