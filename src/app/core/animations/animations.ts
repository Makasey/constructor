import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from "@angular/animations";

export const enterAnimation: AnimationTriggerMetadata = trigger("enterAnimation", [
    transition(":enter", [style({ opacity: 0 }), animate("0.3s ease", style({ opacity: 1 }))]),
    transition(":leave", [style({ opacity: 1 }), animate("0.15s ease-out", style({ opacity: 0 }))]),
]);
export const fadeInAnimation: AnimationTriggerMetadata = trigger("fadeIn", [
    transition(":enter", [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))]),
]);

export const fadeOutAnimation: AnimationTriggerMetadata = trigger("fadeOut", [
    state("open", style({ opacity: 1 })),
    state("hidden", style({ opacity: 0 })),
    transition("open => hidden", [animate("5s")]),
]);
