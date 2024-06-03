import { ArrayOrIterable, CollectFnConfig, Primitive } from "@shared-types";
import { isObjectEquals } from "@shared-utils";

export function defaultCollectFn<T = unknown>(sourceItem: T): Primitive {
    return sourceItem as unknown as Primitive;
}

export function hasIntersection<T = string, K = T>(
    {
        source = [], 
        destination = [], 
        destinationCollectFn = defaultCollectFn, 
        sourceCollectFn = defaultCollectFn 
    }: CollectFnConfig<T, K>): boolean {
    if(!source.length || !destination.length) {
        return false;
    }

    const mappedSource = source.map(sourceItem => sourceCollectFn(sourceItem));
    const sourceCollection = new Set(mappedSource);
    
    return destination.some(destinationItem => {
        const processedDestinationItem = destinationCollectFn(destinationItem);

        return sourceCollection.has(processedDestinationItem);
    });
}

export function isArrayEquals<T = unknown>(target: ArrayOrIterable<T>, other: ArrayOrIterable<T>): boolean {
    if(!target || !other) {
        return false;
    }

    const targetArray = Array.isArray(target) ? target: Array.from<T>(target);
    const otherArray =  Array.isArray(other) ? other : Array.from<T>(other);

    return (
        targetArray.length === otherArray.length &&
        targetArray.every(element => !!otherArray.find(otherElement => isObjectEquals(element, otherElement)))
    );
}

