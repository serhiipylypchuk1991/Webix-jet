import {JetView} from "webix-jet";
import {countries} from "models/countries";
import {statuses} from "models/statuses";
import GridView from "views/grid_view";
export default class DataView extends JetView{
	config(){
		var tabview = {
	    view:"tabview",
	    cells:[
	      {
	        header:"Countries",
	        body: new GridView(this.app, countries)
	      },
	      {
					header:"Statuses",
	        body: new GridView(this.app, statuses)
	 			}
	    ]
		};
		return tabview;
	}
}
