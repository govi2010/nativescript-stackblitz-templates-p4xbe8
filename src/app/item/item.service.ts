import { Injectable } from '@angular/core'
import {IAccountDRElement} from "~/app/item/items.commopnent.store";



@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items = new Array<IAccountDRElement>(

  )

  getItems(): Array<Item> {
    return this.items
  }

  getItem(id: number): Item {
    return this.items.filter((item) => item.id === id)[0]
  }
}
