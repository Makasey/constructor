import { Injectable } from "@angular/core";
import { TableMeta, TableRow } from "@components/ui";

@Injectable()
export class OrdersService {
    public getTableValues(): TableRow[] {
        return [];
    }

    public getTableMeta(): TableMeta[] {
        return [];
    }
}
