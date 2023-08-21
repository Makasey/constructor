import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouteKey } from "@shared-types/routes/route-paths";

@Component({
    selector: "app-person",
    templateUrl: "./person.component.html",
    styleUrls: ["./person.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {
    public accountMenuItems: { icon: string; title: string; link: RouteKey }[] = [
        {
            title: "Личный кабинет",
            link: RouteKey.PERSON,
            icon: "assets/person.svg",
        },
        {
            title: "Адресы",
            link: RouteKey.ADDRESSES,
            icon: "assets/geo.svg",
        },
        {
            title: "Заказы",
            link: RouteKey.ORDERS,
            icon: "assets/orders.svg",
        },
        // {
        //     title: "Настройки",
        //     link: RouteKey.SETTINGS,
        //     icon: "assets/settings.svg",
        // },
        {
            title: "Напоминания",
            link: RouteKey.NOTIFICATIONS,
            icon: "assets/calendar.svg",
        },
        {
            title: "О скидках",
            link: RouteKey.SALES,
            icon: "assets/sales.svg",
        },
    ];
}
