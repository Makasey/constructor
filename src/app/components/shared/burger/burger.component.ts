import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { MODAL_DATA_TOKEN, ModalService, ModalWithData } from "@components/ui";
import { NgClass, NgFor, NgIf, NgOptimizedImage } from "@angular/common";

@Component({
    selector: "lz-burger",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    styleUrls: ["./burger.component.scss"],
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./burger.component.html",
    imports: [NgFor, NgIf, NgClass, NgOptimizedImage],
})
export class BurgerComponent implements ModalWithData<{ id: string; }> {
    public data: { id: string; };

    public readonly socialLinks: { link: string; iconClass: string; icon: string; alt: string; }[] = [
        {
            link: "https://wa.me/375255345899",
            alt: "Whatsapp icon",
            icon: "assets/WhatsApp.svg",
            iconClass: "_whatsapp",
        },
        {
            link: "https://t.me/AlexProffe",
            alt: "Telegram icon",
            icon: "assets/telegram.svg",
            iconClass: "_telegram",
        },
        {
            link: "https://vk.com/alexproffe",
            alt: "Vkontakte icon",
            icon: "assets/vk.svg",
            iconClass: "_vkontakte",
        },
        {
            link: "https://instagram.com/_u/alexplay_yt_/",
            alt: "Instagram icon",
            icon: "assets/instagram.svg",
            iconClass: "_instagram",
        },
    ];

    public readonly contactLinks: { link: string; alt: string; icon: string; label: string; }[] = [
        {
            link: "tel:+79202114903",
            label: "+7 (920) 211-49-03",
            alt: "Call icon",
            icon: "assets/Call.svg",
        },
        {
            link: "https://yandex.by/maps/-/CCUsFAqMCB",
            label: "Зыбицкая 2",
            alt: "Marker icon",
            icon: "assets/marker.svg",
        },
        {
            link: "mailto:alextechmailer@yandex.ru",
            label: "alextechmailer@yandex.ru",
            alt: "Envelope icon",
            icon: "assets/envelope.svg",
        },
    ];

    private readonly modalService = inject(ModalService);

    private readonly config = inject(MODAL_DATA_TOKEN) as { id: string; };

    public closeModal(): void {
        this.modalService.closeModal(this.config.id);
    }
}
