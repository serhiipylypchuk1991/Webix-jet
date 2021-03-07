import {JetView} from "webix-jet";
import GridView from "views/grid_view";
import {countries} from "models/countries";
import {statuses} from "models/statuses";

export default class DataView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		const tabview = {
			view:"tabview",
			cells:[
				{
					header:_("Countries"),
					body: new GridView(this.app, countries)
				},
				{
					header:_("Statuses"),
					body: new GridView(this.app, statuses)
				}
			]
		};

		return tabview;
	}

}
