import { TABLE_CELL_HEIGHT } from "@components";

type ComponentWithScroll = {
    previousScrollPosition: number | undefined;
};

export function checkScrollPosition(this: ComponentWithScroll, event: Event): boolean {
    const target = event.target as HTMLDivElement;

    if (target.scrollHeight === target.clientHeight) {
        return false;
    }

    if (this.previousScrollPosition !== undefined) {
        const isVerticalScroll = target.scrollLeft === this.previousScrollPosition;

        this.previousScrollPosition = target.scrollLeft;

        return Math.ceil(target.scrollTop + target.clientHeight) + TABLE_CELL_HEIGHT / 2 >= target.scrollHeight && isVerticalScroll;
    }

    this.previousScrollPosition = target.scrollLeft;

    return false;
}
