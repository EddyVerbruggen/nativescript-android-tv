import * as observable from "tns-core-modules/data/observable";
import { Observable } from "tns-core-modules/data/observable";

export class Cat {
  constructor(public url: string) {
  }
}

export class HelloWorldModel extends Observable {
  public page: string = "Select a page on the left..";
  public cats: Array<Cat> = [];

  constructor() {
    super();
  }

  public loadCats(args?: observable.EventData): void {
    this.set("page", "Cats page " + (args && args.object ? args.object["pageid"] : 1));

    const newCats: Array<Cat> = [];
    for (let i = 0; i < 18; i++) {
      newCats.push(new Cat("http://thecatapi.com/api/images/get?size=med&type=jpg&rand=" + Math.random()));
    }
    this.set("cats", newCats);
  }
}